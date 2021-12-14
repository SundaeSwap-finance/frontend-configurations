import { BigIntMath } from "utils/helpers";
import { ADA, Asset, LPAsset } from "../asset";
import { AssetAmount } from "../asset-amount";
import { Fraction } from "../fraction";

export enum PoolError {
  ASSET_NOT_FOUND = "ASSET_NOT_FOUND",
  INSUFFICIENT_RESERVES = "INSUFFICIENT_RESERVES",
  NON_POSITIVE_AMOUNT = "NON_POSITIVE_INPUT",
}

export class Pool {
  static getCreatePoolMintedLp(a: AssetAmount, b: AssetAmount): AssetAmount<LPAsset> {
    return new AssetAmount(
      new LPAsset({ id: "new_lp", assetA: a.asset, assetB: b.asset, decimals: 0 }),
      BigIntMath.sqrt(a.amount * b.amount)
    );
  }

  readonly id: string;
  readonly lpAsset: AssetAmount<LPAsset>;
  readonly lpReserveA: AssetAmount;
  readonly lpReserveB: AssetAmount;
  readonly fee: Fraction;
  readonly product: bigint;

  constructor(
    lpAsset: AssetAmount<LPAsset>,
    lpReserveA: AssetAmount,
    lpReserveB: AssetAmount,
    fee: Fraction,
    id?: string
  ) {
    this.lpAsset = lpAsset;
    this.lpReserveA = lpReserveA;
    this.lpReserveB = lpReserveB;
    this.fee = fee;
    this.id = id ?? lpAsset.asset.poolIdentifier ?? lpAsset.asset.id;
    this.product = this.lpReserveA.amount * this.lpReserveB.amount;
  }

  isLPAssetOfPool(asset: Asset) {
    return asset.id === this.lpAsset.asset.id;
  }

  hasAsset(asset: Asset | string): boolean {
    return this.lpReserveA.isEqualAsset(asset) || this.lpReserveB.isEqualAsset(asset);
  }

  getShares(lpAsset: AssetAmount): [AssetAmount, AssetAmount] {
    if (lpAsset.asset.id !== this.lpAsset.asset.id) {
      return [this.lpReserveA.withAmount(0n), this.lpReserveB.withAmount(0n)];
    }
    return [
      this.lpReserveA.withAmount(
        new Fraction(lpAsset.amount * this.lpReserveA.amount, this.lpAsset.amount)
      ),
      this.lpReserveB.withAmount(
        new Fraction(lpAsset.amount * this.lpReserveB.amount, this.lpAsset.amount)
      ),
    ];
  }

  addLiquidity(amountA: AssetAmount): {
    amountLp: AssetAmount<LPAsset>;
    amountA: AssetAmount;
    amountB: AssetAmount;
    share: Fraction;
  } {
    const [reserveA, reserveB] = this.getABReservePairForA(amountA.asset);
    const nextLpAmount = new Fraction(
      this.lpAsset.amount * (amountA.amount + reserveA.amount),
      reserveA.amount
    ).quotient;
    const amountLp = this.lpAsset.withAmount(nextLpAmount - this.lpAsset.amount);
    const amountB = reserveB.withAmount(
      new Fraction(reserveB.amount * amountA.amount, reserveA.amount)
    );
    const share = new Fraction(amountLp.amount, nextLpAmount);
    return { amountLp, amountA, amountB, share };
  }

  withdrawLiquidity(amountLp: AssetAmount): { amountA: AssetAmount; amountB: AssetAmount } {
    return {
      amountA: this.lpReserveA.withAmount(
        (this.lpReserveA.amount * amountLp.amount) / this.lpAsset.amount
      ),
      amountB: this.lpReserveB.withAmount(
        (this.lpReserveB.amount * amountLp.amount) / this.lpAsset.amount
      ),
    };
  }

  getTotalLiquidity(a: AssetAmount, b: AssetAmount): bigint {
    return BigIntMath.sqrt(a.amount * b.amount);
  }

  getABPriceForA(assetA: Asset): Fraction {
    const [reserveA, reserveB] = this.getABReservePairForA(assetA);
    return new Fraction(reserveA.amount, reserveB.amount);
  }

  getBAPriceForA(assetA: Asset): Fraction {
    return this.getABPriceForA(assetA).invert();
  }

  getABReservePairForA(assetA: Asset): [AssetAmount, AssetAmount] {
    if (assetA.equals(this.lpReserveA.asset)) return [this.lpReserveA, this.lpReserveB];
    if (assetA.equals(this.lpReserveB.asset)) return [this.lpReserveB, this.lpReserveA];
    throw new Error(PoolError.ASSET_NOT_FOUND);
  }

  getABReservePairForB(assetB: Asset): [AssetAmount, AssetAmount] {
    if (assetB.equals(this.lpReserveB.asset)) return [this.lpReserveA, this.lpReserveB];
    if (assetB.equals(this.lpReserveA.asset)) return [this.lpReserveB, this.lpReserveA];
    throw new Error(PoolError.ASSET_NOT_FOUND);
  }

  reserveOf(asset: Asset): AssetAmount {
    if (asset.equals(this.lpReserveB.asset)) return this.lpReserveB;
    if (asset.equals(this.lpReserveA.asset)) return this.lpReserveA;
    throw new Error(PoolError.ASSET_NOT_FOUND);
  }

  swap(input: AssetAmount): {
    output: AssetAmount;
    adaFee: AssetAmount;
    scooperFee: AssetAmount;
    lpFee: AssetAmount;
    deposit: AssetAmount;
    slippage: Fraction;
    priceImpact: Fraction;
    nextState: Pool;
    idealOutput: Fraction;
  } {
    if (input.amount <= 0) throw new Error(PoolError.NON_POSITIVE_AMOUNT);
    const [inputReserve, outputReserve] = this.getABReservePairForA(input.asset);
    const nextInputReserve = inputReserve.amount + input.amount;
    const nextOutputReserve = new Fraction(this.product, nextInputReserve);
    const lpFee = this.fee.multiply(input.amount);
    const output = Fraction.ONE.subtract(this.fee).multiply(
      new Fraction(outputReserve.amount).subtract(nextOutputReserve)
    );
    const currentPrice = new Fraction(outputReserve.amount, inputReserve.amount);
    const idealOutput = new Fraction(input.amount)
      .multiply(currentPrice)
      .multiply(Fraction.ONE.subtract(this.fee));
    const slippage = Fraction.ONE.subtract(output.divide(idealOutput));
    const nextPrice = new Fraction(nextOutputReserve.quotient, nextInputReserve);
    const priceImpact = Fraction.ONE.subtract(currentPrice.divide(nextPrice));

    const nextState = new Pool(
      this.lpAsset,
      this.lpReserveA.withAmount(nextInputReserve),
      this.lpReserveB.withAmount(nextOutputReserve),
      this.fee
    );
    return {
      idealOutput,
      output: outputReserve.withAmount(output),
      adaFee: new AssetAmount(ADA, BigInt(500000)), // TODO
      scooperFee: new AssetAmount(ADA, BigInt(500000)), // TODO
      deposit: new AssetAmount(ADA, BigInt(2000000)),
      lpFee: inputReserve.withAmount(lpFee),
      slippage,
      priceImpact,
      nextState,
    };
  }

  getSwapInput(output: AssetAmount): {
    input: AssetAmount;
    fee: AssetAmount;
    slippage: Fraction;
    nextState: Pool;
    adaFee: AssetAmount;
    scooperFee: AssetAmount;
    deposit: AssetAmount;
  } {
    if (output.amount <= 0) throw new Error(PoolError.NON_POSITIVE_AMOUNT);
    const [inputReserve, outputReserve] = this.getABReservePairForB(output.asset);
    if (output.amount >= outputReserve.amount) throw new Error(PoolError.INSUFFICIENT_RESERVES);
    const totalOutput = new Fraction(output.amount).divide(Fraction.ONE.subtract(this.fee));
    const nextOutputReserve = outputReserve.amount - totalOutput.quotient;
    const nextInputReserve = new Fraction(this.product, nextOutputReserve);
    const input = nextInputReserve.subtract(inputReserve.amount);
    const currentPrice = new Fraction(outputReserve.amount, inputReserve.amount);
    const idealOutput = input.multiply(currentPrice).multiply(Fraction.ONE.subtract(this.fee));
    const slippage = Fraction.ONE.subtract(new Fraction(output.amount).divide(idealOutput));

    const nextState = new Pool(
      this.lpAsset,
      this.lpReserveA.withAmount(nextInputReserve),
      this.lpReserveB.withAmount(nextOutputReserve),
      this.fee
    );
    return {
      input: inputReserve.withAmount(input),
      fee: outputReserve.withAmount(totalOutput.subtract(output.amount)),
      slippage,
      nextState,
      adaFee: new AssetAmount(ADA, BigInt(500000)), // TODO
      scooperFee: new AssetAmount(ADA, BigInt(500000)), // TODO
      deposit: new AssetAmount(ADA, BigInt(2000000)),
    };
  }
}
