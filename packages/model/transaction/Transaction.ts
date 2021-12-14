/**
 * High level Transaction types
 */
export enum TransactionType {
  CreateLiquidityPool = "CreateLiquidityPool",
  DepositLiquidity = "DepositLiquidity",
  WithdrawLiquidity = "WithdrawLiquidity",
  Swap = "Swap",
  LockLiquidity = "LockLiquidity",
  UnlockLiquidity = "UnlockLiquidity",
  CancelEscrow = "CancelEscrow",
  // DEMO Purposes
  SendAda = "SendAda",
  MintAsset = "MintAsset",
  AdaFaucet = "AdaFaucet",
  RequestGoodies = "RequestGoodies",
}
