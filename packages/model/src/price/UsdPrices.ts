import { AssetAmount } from "../asset-amount";
import { Asset } from "../asset";
import { Price } from "./Price";

export const convertUsingDollarValue = (
  usdPrices: { [assetId: string]: Price } | null,
  assetAmount?: AssetAmount | null,
  target?: Asset | string | null
): AssetAmount | undefined => {
  if (!assetAmount?.value.greaterThan(0) || !target) return;
  const valueUsdPrice = usdPrices?.[assetAmount.asset.id];
  const targetUsdPrice = usdPrices?.[typeof target === "string" ? target : target.id];
  return valueUsdPrice && targetUsdPrice
    ? targetUsdPrice.exchange(valueUsdPrice.exchange(assetAmount))
    : undefined;
};

export const getDollarValue = (
  usdPrices?: { [assetId: string]: Price } | null,
  value?: AssetAmount | null
): AssetAmount | undefined | null => value && usdPrices?.[value.asset.id]?.exchange(value);
