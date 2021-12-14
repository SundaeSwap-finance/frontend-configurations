import { AssetAmount } from '../asset-amount/AssetAmount';
import { Asset } from '../asset/Asset';
import { LPAsset } from '../asset/LPAsset';
import { Fraction } from '../fraction/Fraction';
import { Pool } from './Pool';

describe('Pool', () => {
  const assetA = new Asset({ id: 'TestAssetA', name: 'TestAssetA' });
  const assetB = new Asset({ id: 'TestAssetB', name: 'TestAssetB' });
  const lpAsset = new LPAsset({ id: 'TestPoolAsset', name: 'TestPoolAsset', assetA, assetB });
  const threePct = new Fraction(3, 100);

  const threePctFeePool = new Pool(
    new AssetAmount(lpAsset, 2000),
    new AssetAmount(assetA, 1000),
    new AssetAmount(assetB, 1000),
    threePct
  );

  const zeroFeePool = new Pool(
    new AssetAmount(lpAsset, 2000),
    new AssetAmount(assetA, 1000),
    new AssetAmount(assetB, 1000),
    Fraction.ZERO
  );

  test('#swap() A -> B without fees', () => {
    const { output } = zeroFeePool.swap(new AssetAmount(assetB, 1));
    expect(output.asset.equals(assetA)).toBe(true);
    expect(output.amount).toBe(new Fraction(1000, 1001).quotient);
  });

  test('#swap() B -> A without fees', () => {
    const { output } = zeroFeePool.swap(new AssetAmount(assetA, 1));
    expect(output.asset.equals(assetB)).toBe(true);
    expect(output.amount).toBe(new Fraction(1000, 1001).quotient);
  });

  test('#swap() A -> B with 3% fee', () => {
    const expectedOutputA = Fraction.ONE.subtract(threePct).multiply(new Fraction(1000, 1001)).quotient;
    const { output } = threePctFeePool.swap(new AssetAmount(assetB, 1));
    expect(output.asset.equals(assetA)).toBe(true);
    expect(output.amount).toBe(expectedOutputA);
  });

  test('#swap() B -> A with 3% fee', () => {
    const expectedOutputB = Fraction.ONE.subtract(threePct).multiply(new Fraction(1000, 1001)).quotient;
    const { output } = threePctFeePool.swap(new AssetAmount(assetA, 1));
    expect(output.asset.equals(assetB)).toBe(true);
    expect(output.amount).toBe(expectedOutputB);
  });

  test('#swap() throws if asset is not part of the pool', () => {
    expect(() => {
      threePctFeePool.swap(
        new AssetAmount(
          new Asset({
            id: 'definitely not part of this pool',
            name: 'definitely not part of this pool',
          }),
          111
        )
      );
    }).toThrow();
  });

  // test("#swap() slippage", () => {
  //   const assetA = ADA;
  //   const assetB = SUNDAE;
  //   const pool = new Pool(
  //     new AssetAmount(
  //       new LPAsset({ id: "test.lpAsset", assetA, assetB, poolIdentifier: "00" }),
  //       1_000_000
  //     ),
  //     AssetAmount.fromValue(ADA, 100),
  //     AssetAmount.fromValue(SUNDAE, 200),
  //     Percent.ONE.fraction,
  //     "00"
  //   );

  //   for (const amount of [1, 2, 1e3, 1e6, 1e8, 1e9, 1e12]) {
  //     const input = new AssetAmount(ADA, amount);
  //     const result = pool.swap(input);

  //     console.log({
  //       input: input.formatValueWithAsset(),
  //       idealOutput: new AssetAmount(assetB, result.idealOutput).formatValueWithAsset(),
  //       slippage: result.slippage.toString(),
  //       priceImpact: result.priceImpact.toString(),
  //       fee: result.fee.formatValueWithAsset(),
  //       output: result.output.formatValueWithAsset(),
  //     });
  //   }
  // });

  test('#getSwapInput() A -> B without fees', () => {
    const { input } = zeroFeePool.getSwapInput(new AssetAmount(assetB, 1n));
    expect(input.asset.equals(assetA)).toBe(true);
    expect(input.amount).toBe(1n);
  });
});
