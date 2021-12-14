export type CustomUserAsset = {
  decimals: number;
  description: string | null;
  id: string | null;
  logoUrl: string | null;
  name: string | null;
  policyId: string | null;
  ticker: string | null;
  websiteUrl: string | null;
};

export type User = {
  adaHandle?: string | null;
  adaHandleSeen?: boolean;
  assets?: Record<string, CustomUserAsset>;
  betaAcknowledged?: boolean;
  farmsViewMode?: ViewMode;
  language?: string;
  liquidityViewMode?: ViewMode;
  slippageTolerance?: number;
  timestamp?: number;
  theme?: ACTIVE_USER_THEME;
  transactionDeadline?: number;
};

export enum ViewMode {
  LIST = 'list',
  TILES = 'tiles',
}

export enum ViewModeArea {
  FARMS = 'farms',
  LIQUIDITY = 'liquidity',
}

export enum ACTIVE_USER_THEME {
  DARK = 'dark',
  LIGHT = 'light',
}

const IS_PREFERRABLY_DARK_THEME = window?.matchMedia('prefers-color-scheme: dark').matches;

export const DEFAULT_USER: User = {
  adaHandle: undefined,
  adaHandleSeen: false,
  assets: undefined,
  betaAcknowledged: false,
  farmsViewMode: undefined,
  language: 'en',
  liquidityViewMode: ViewMode.LIST,
  // slippageTolerance: 0.5,
  timestamp: Date.now(),
  theme: IS_PREFERRABLY_DARK_THEME ? ACTIVE_USER_THEME.DARK : ACTIVE_USER_THEME.LIGHT,
  transactionDeadline: 240, // 4 Minutes
};
