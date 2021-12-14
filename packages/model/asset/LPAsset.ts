import { Asset } from "./Asset";

export class LPAsset extends Asset {
  static isLPAsset(asset: Asset): asset is LPAsset {
    return asset instanceof LPAsset;
  }

  static fromAssets({
    assetA,
    assetB,
    policyId,
    poolIdentifier,
    id,
    name,
    decimals,
  }: {
    assetA: Asset;
    assetB: Asset;
    policyId: string;
    poolIdentifier: string;
    id?: string;
    name?: string;
    decimals?: number;
  }): LPAsset {
    return new LPAsset({
      id: id ?? `LP_${assetA.id}_${assetB.id}`,
      name: name ?? `LP_${assetA.name}_${assetB.name}`,
      policyId,
      decimals,
      ticker: `LP-${assetA.ticker ?? assetA.display()}-${assetB.ticker ?? assetB.display()}`,
      poolIdentifier,
      assetA,
      assetB,
    });
  }

  assetA: Asset;
  assetB: Asset;
  readonly poolIdentifier?: string;

  constructor({
    id,
    policyId,
    assetA,
    assetB,
    poolIdentifier,
    decimals,
    name,
    ticker,
  }: {
    id: string;
    policyId?: string;
    name?: string;
    decimals?: number;
    ticker?: string;
    poolIdentifier?: string;
    assetA: Asset;
    assetB: Asset;
  }) {
    super({
      id,
      name,
      policyId,
      decimals,
      ticker,
    });
    this.poolIdentifier = poolIdentifier;
    this.assetA = assetA;
    this.assetB = assetB;
  }
}
