import { TJsonFraction } from "../model-json.types";
import { BigIntish, getDecimalSeparator, getLocaleFormatOptions } from "../shared";

const DEFAULT_MAX_DECIMALS = 30;

export class Fraction {
  static readonly ZERO = new Fraction(0);
  static readonly ONE = new Fraction(1);
  static readonly HUNDRED = new Fraction(100);
  static readonly THOUSAND = new Fraction(1000);

  static abs(f: Fraction): Fraction {
    return f.lessThan(Fraction.ZERO) ? f.multiply(-1) : f;
  }

  static compare(a: Fraction, b: Fraction): number {
    if (a.greaterThan(b)) return 1;
    if (a.lessThan(b)) return -1;
    return 0;
  }

  static fromJSON(json: TJsonFraction) {
    return new Fraction(json.numerator, json.denominator);
  }

  static asFraction(numerator: Fraction | BigIntish): Fraction {
    return numerator instanceof Fraction ? numerator : Fraction.fromString(numerator.toString());
  }

  static fromLocaleString(numStr: string, locale?: string): Fraction {
    const { decimalSeparator, groupSeparator } = getLocaleFormatOptions(locale);
    const [integerPart, fractionalPart] = numStr.split(decimalSeparator);
    const quotient = BigInt(integerPart.split(groupSeparator).join(""));
    if (!fractionalPart?.length) return new Fraction(quotient);
    const denominator = 10n ** BigInt(fractionalPart.length);
    return new Fraction(quotient * denominator + BigInt(fractionalPart), denominator);
  }

  static fromString(numStr: string): Fraction {
    const [integerPart, fractionalPart] = numStr.split(".");
    if (!fractionalPart?.length) return new Fraction(integerPart);
    const denominator = 10n ** BigInt(fractionalPart.length);
    return new Fraction(BigInt(integerPart) * denominator + BigInt(fractionalPart), denominator);
  }

  readonly numerator: bigint;
  readonly denominator: bigint;

  constructor(numerator: BigIntish, denominator?: BigIntish) {
    this.numerator = BigInt(numerator);
    this.denominator = BigInt(denominator || 1n);
  }

  invert(): Fraction {
    return new Fraction(this.denominator, this.numerator);
  }

  get quotient(): bigint {
    return this.numerator / this.denominator;
  }

  getQuotient(): bigint {
    return this.numerator / this.denominator;
  }

  get remainder(): Fraction {
    return new Fraction(this.numerator % this.denominator, this.denominator);
  }

  getRemainder(): Fraction {
    return new Fraction(this.numerator % this.denominator, this.denominator);
  }

  getRemainderOrNull(): Fraction | null {
    const remainder = this.getRemainder();
    return remainder.equals(Fraction.ZERO) ? null : remainder;
  }

  add(rhs: Fraction | BigIntish): Fraction {
    rhs = Fraction.asFraction(rhs);
    return new Fraction(
      this.numerator * rhs.denominator + rhs.numerator * this.denominator,
      this.denominator * rhs.denominator
    );
  }

  subtract(rhs: Fraction | BigIntish): Fraction {
    rhs = Fraction.asFraction(rhs);
    return new Fraction(
      this.numerator * rhs.denominator - rhs.numerator * this.denominator,
      this.denominator * rhs.denominator
    );
  }

  multiply(rhs: Fraction | BigIntish): Fraction {
    rhs = Fraction.asFraction(rhs);
    return new Fraction(this.numerator * rhs.numerator, this.denominator * rhs.denominator);
  }

  divide(rhs: Fraction | BigIntish): Fraction {
    rhs = Fraction.asFraction(rhs);
    return new Fraction(this.numerator * rhs.denominator, this.denominator * rhs.numerator);
  }

  lessThan(rhs: Fraction | BigIntish): boolean {
    rhs = Fraction.asFraction(rhs);
    return this.numerator * rhs.denominator < rhs.numerator * this.denominator;
  }

  lessThanOrEqual(rhs: Fraction | BigIntish): boolean {
    rhs = Fraction.asFraction(rhs);
    return this.numerator * rhs.denominator <= rhs.numerator * this.denominator;
  }

  equals(rhs: Fraction | BigIntish): boolean {
    rhs = Fraction.asFraction(rhs);
    return this.numerator * rhs.denominator === rhs.numerator * this.denominator;
  }

  greaterThan(rhs: Fraction | BigIntish): boolean {
    rhs = Fraction.asFraction(rhs);
    return this.numerator * rhs.denominator > rhs.numerator * this.denominator;
  }

  greaterThanOrEqual(rhs: Fraction | BigIntish): boolean {
    rhs = Fraction.asFraction(rhs);
    return this.numerator * rhs.denominator >= rhs.numerator * this.denominator;
  }

  formatQuotientToLocaleString(locale?: string): string {
    return Intl.NumberFormat(locale).format(this.getQuotient());
  }

  remainderToString(decimals = DEFAULT_MAX_DECIMALS): string {
    if (decimals <= 0) return "";
    const remainder = this.getRemainder();
    return remainder.equals(Fraction.ZERO)
      ? ""
      : remainder
          .multiply(10n ** BigInt(decimals))
          .getQuotient()
          .toString()
          .replace(/^-/, "")
          .substring(0, decimals)
          .padStart(decimals, "0")
          .replace(/0*$/, "");
  }

  toLocaleString(locale?: string, decimals = DEFAULT_MAX_DECIMALS): string {
    const formattedIntegerPart = Intl.NumberFormat(locale).format(this.getQuotient());
    const formattedFractionalPart = this.remainderToString(decimals);
    return formattedFractionalPart
      ? `${formattedIntegerPart}${getDecimalSeparator(locale)}${formattedFractionalPart}`
      : formattedIntegerPart;
  }

  toString(decimals = DEFAULT_MAX_DECIMALS): string {
    const formattedIntegerPart = this.getQuotient().toString();
    const formattedFractionalPart = this.remainderToString(decimals);
    return formattedFractionalPart
      ? `${formattedIntegerPart}.${formattedFractionalPart}`
      : formattedIntegerPart;
  }

  toPrecision(decimals = DEFAULT_MAX_DECIMALS): Fraction {
    return Fraction.fromString(this.toString(decimals));
  }

  toJSON(key?: string | number): string {
    return this.toString(20);
  }
}
