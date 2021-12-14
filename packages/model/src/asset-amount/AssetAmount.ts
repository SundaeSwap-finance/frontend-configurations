import { Asset } from '../asset';
import { Fraction } from '../fraction';
import type { TJsonAsset, TJsonAssetAmount } from '../model-json.types';
import type { BigIntish } from '../shared';

export class AssetAmount<A extends Asset = Asset> {
  static readonly MAX_AMOUNT = 18446744073709551615n;

  readonly asset: A;
  readonly amount: bigint;

  static compare(a: AssetAmount, b: AssetAmount): number {
    if (a.amount > b.amount) return 1;
    if (a.amount < b.amount) return -1;
    return 0;
  }

  static fromJSON(json: TJsonAssetAmount): AssetAmount {
    return new AssetAmount(Asset.fromJSON(json.asset), json.amount);
  }

  toJSON(): { asset: TJsonAsset; amount: string } {
    return {
      asset: this.asset.toJSON(),
      amount: this.amount.toString(),
    };
  }

  static fromValue<A extends Asset = Asset>(asset: A, value: BigIntish | Fraction): AssetAmount<A> {
    return new AssetAmount(asset, Fraction.asFraction(value).multiply(10 ** (asset.decimals ?? 0)));
  }

  constructor(asset: A, amount: BigIntish | Fraction) {
    this.asset = asset;
    this.amount = Fraction.asFraction(amount).quotient;
  }

  formatValueWithAsset() {
    return `${this.formatValue()} ${this.asset.ticker ?? this.asset.name}`;
  }

  get decimals(): number | undefined {
    return this.asset.decimals;
  }

  get value(): Fraction {
    return new Fraction(this.amount, 10 ** (this.decimals ?? 0));
  }

  isEqualAsset(asset: Asset | string): boolean {
    return this.asset.equals(asset);
  }

  formatValue(decimals = this.asset.decimals): string {
    return this.value.toString(decimals);
  }

  localeFormatValue(locale?: string, decimals = this.asset.decimals): string {
    return this.value.toLocaleString(locale, decimals);
  }

  withAmount(amount: BigIntish | Fraction): AssetAmount<A> {
    return new AssetAmount(this.asset, amount);
  }

  withValue(amount: BigIntish | Fraction): AssetAmount<A> {
    return new AssetAmount(this.asset, Fraction.asFraction(amount).multiply(10 ** (this.decimals ?? 0)));
  }

  withFormattedValue(amount: string): AssetAmount<A> {
    return new AssetAmount(this.asset, Fraction.fromString(amount).multiply(10 ** (this.decimals ?? 0)));
  }

  withLocaleFormattedValue(amount: string, locale?: string): AssetAmount<A> {
    return new AssetAmount(this.asset, Fraction.fromLocaleString(amount, locale).multiply(10 ** (this.decimals ?? 0)));
  }
}
