import { AssetAmount } from "model/asset-amount";
import { Fraction } from "model/fraction";
import { TransactionType } from "./Transaction";

export type TTransactionRequestInput =
  | { type: TransactionType.AdaFaucet; data: TAdaFaucetTransactionInput }
  | { type: TransactionType.MintAsset; data: TMintAssetTransactionInput }
  | { type: TransactionType.SendAda; data: TSendAdaTransactionInput }
  | { type: TransactionType.RequestGoodies; data: TRequestGoodiesTransactionInput }
  // EOF Demo
  | { type: TransactionType.CreateLiquidityPool; data: TCreateLiquidityPoolTransactionInput }
  | { type: TransactionType.DepositLiquidity; data: TEscrowDepositTransactionInput }
  | { type: TransactionType.WithdrawLiquidity; data: TEscrowWithdrawTransactionInput }
  | { type: TransactionType.Swap; data: TSwapTransactionInput }
  | { type: TransactionType.CancelEscrow; data: TCancelEscrowTransactionInput };

/**
 * Demo/Dev transactions
 */
export type TAdaFaucetTransactionInput = {
  amount: bigint;
};

export type TMintAssetTransactionInput = {
  assetName: string;
  amount: bigint;
};

export type TSendAdaTransactionInput = {
  amount: bigint;
  receiver: string;
};

export type TRequestGoodiesTransactionInput = {
  // address can be provided as arg, but better pulled from wallet service
  address?: string;
};
// EOF Demo

export type TCreateLiquidityPoolTransactionInput = {
  assetA: AssetAmount;
  assetB: AssetAmount;
  liquidityProviderFee?: Fraction;
};

export type TEscrowDepositTransactionInput = {
  assetA: AssetAmount;
  assetB: AssetAmount;
  liquidityProviderFee?: Fraction;
};

export type TEscrowWithdrawTransactionInput = {
  lpAsset: AssetAmount;
};

export type TSwapTransactionInput = {
  assetFrom: AssetAmount;
  assetTo: AssetAmount;
  maxSlippage?: Fraction;
};

export type TCancelEscrowTransactionInput = {
  txID: string;
};
