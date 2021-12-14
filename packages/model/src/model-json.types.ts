export type IntString = string;

/**
 * These plain json types are only necessary if we wanted to serialize the models on the client side.
 * E.g.: saving them in LocalStorage, or IndexedDB
 * Currently they are not used by components.
 */

export type TJsonFraction = {
  numerator: IntString;
  denominator: IntString;
};

export type TJsonAsset = {
  id: string;
  policyId: string;
  name: string;
  decimals?: number;
  logoUrl?: string | null;
  ticker?: string | null;
  description?: string | null;
  websiteUrl?: string | null;
};

export type TJsonAssetAmount = {
  asset: TJsonAsset;
  amount: IntString;
};

export type TJsonLiquidityPool = {
  id: string;
  fee: TJsonFraction;
  reserveA: TJsonAssetAmount;
  reserveB: TJsonAssetAmount;
  lpAsset: TJsonAssetAmount;
};

export type TJsonBalanceMap = {
  [assetId: string]: TJsonAssetAmount;
};

export type TJsonAssetMap = {
  [assetId: string]: TJsonAsset;
};

export type TJsonPoolMap = {
  [assetPairId: string]: TJsonPoolMap[];
};

export type TWalletInfo = {
  id: string;
  label: string;
  logo?: string;
};

export type TAccountInfo = {
  name?: string;
  mainAddress: string;
};
