import { Fraction } from "./Fraction";
import { BigIntish } from "../shared";

export class Percent {
  static HUNDRED = Percent.fromValue(100);
  static ONE = Percent.fromValue(1);
  static ZERO = Percent.fromValue(0);
  static PT_ONE = Percent.fromValue(0.1);
  static PT_THREE = Percent.fromValue(0.3);
  static PT_HALF = Percent.fromValue(0.05);

  readonly fraction: Fraction;

  static fromValue(value: BigIntish | Fraction): Percent {
    return new Percent(Fraction.asFraction(value).divide(100));
  }

  constructor(fraction: Fraction) {
    this.fraction = fraction;
  }

  get value(): Fraction {
    return this.fraction.multiply(100);
  }

  formatValue(precision?: number): string {
    return this.value.toString(precision);
  }

  formatValuePct(precision?: number): string {
    return `${this.formatValue(precision)}%`;
  }
}
