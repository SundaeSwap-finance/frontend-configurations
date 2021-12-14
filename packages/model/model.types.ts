import type { Asset } from "./asset";
import type { AssetAmount } from "./asset-amount";
import { LPAsset } from "./asset/LPAsset";
import type { Pool } from "./pool";
import type { Price } from "./price";

export type TBalanceMap = {
  [assetId: string]: AssetAmount;
};

export type TPositionsMap = {
  [assetId: string]: AssetAmount<LPAsset>;
};

export type TAssetMap = {
  [assetId: string]: Asset;
};

export type TPoolMap = {
  [assetPairId: string]: Pool[]; // triplet?
};

export type TUsdPriceMap = {
  [assetId: string]: Price;
};
