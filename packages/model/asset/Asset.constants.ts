import { Asset } from "./Asset";

const ADA_DECIMALS = 6;
const ADA_TICKER = "ADA";
const ADA_LOGO = `/assets/tokens/cardano.png`;

const SUNDAE_DECIMALS = 6;
const SUNDAE_TICKER = "SUNDAE";
const SUNDAE_LOGO = `/assets/tokens/sundae.png`;

export const ADA = new Asset({
  id: "cardano.ada",
  policyId: undefined,
  name: "ADA",
  decimals: ADA_DECIMALS,
  logoUrl: ADA_LOGO,
  ticker: ADA_TICKER,
});

export const SUNDAE = new Asset({
  id: "sundae",
  policyId: "SUNDAE",
  decimals: SUNDAE_DECIMALS,
  logoUrl: SUNDAE_LOGO,
  ticker: SUNDAE_TICKER,
});
export const USD = new Asset({
  id: "USD",
  policyId: "US Dollar",
  decimals: 2,
  logoUrl: undefined,
  ticker: "USD",
});
export const BTC = new Asset({
  id: "BTC",
  ticker: "BTC",
  decimals: 8,
  // logo: BTC_LOGO
});
export const ETH = new Asset({
  id: "ETH",
  ticker: "ETH",
  decimals: 18,
  // logo: ETH_LOGO
});
