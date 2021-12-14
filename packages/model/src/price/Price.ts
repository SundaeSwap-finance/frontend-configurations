import { getPairId } from "../asset";
import { AssetAmount } from "../asset-amount";
import { Fraction } from "../fraction";

export class Price {
  readonly id: string;
  readonly bPerA: Fraction;
  readonly aPerB: Fraction;

  constructor(readonly assetA: AssetAmount, readonly assetB: AssetAmount) {
    this.id = getPairId(assetA, assetB);
    this.aPerB = new Fraction(assetA.amount, assetB.amount);
    this.bPerA = this.aPerB.invert();
  }

  exchange(assetAmount: AssetAmount): AssetAmount {
    if (assetAmount.asset.equals(this.assetA.asset))
      return this.assetB.withAmount(this.bPerA.multiply(assetAmount.amount));
    if (assetAmount.asset.equals(this.assetB.asset))
      return this.assetA.withAmount(this.aPerB.multiply(assetAmount.amount));
    throw new Error("Invalid asset");
  }
}
