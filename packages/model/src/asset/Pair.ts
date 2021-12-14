import { Asset } from "./Asset";
import type { AssetAmount } from "../asset-amount/AssetAmount";

const PAIR_ASSET_ID_SEPARATOR = "_";

export const getPairId = (...args: Array<Asset | AssetAmount | string>): string =>
  args
    .map((a) => (typeof a === "string" ? a : a instanceof Asset ? a.id : a.asset.id))
    .sort()
    .join(PAIR_ASSET_ID_SEPARATOR);

export const isAssetOfPairId = (assetOrAssetId: string | Asset, pairId: string): boolean =>
  pairId.includes(assetOrAssetId instanceof Asset ? assetOrAssetId.id : assetOrAssetId);

export const getAssetIds = (pairId: string): string[] => {
  return pairId.split(PAIR_ASSET_ID_SEPARATOR);
};
