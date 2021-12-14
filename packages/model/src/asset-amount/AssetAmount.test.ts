import { ADA } from "../asset";
import { AssetAmount } from "./AssetAmount";

describe("AssetAmount", () => {
  test("#formatValue()", () => {
    expect(new AssetAmount(ADA, 2_000_000).formatValue()).toBe("2");
    expect(new AssetAmount(ADA, 1).formatValue()).toBe("0.000001");
    expect(new AssetAmount(ADA, 1_782_043_000).formatValue()).toBe("1782.043");
  });

  test("#withFormattedAmount()", () => {
    const zeroAda = new AssetAmount(ADA, 0);
    expect(zeroAda.withFormattedValue("2").formatValue()).toBe("2");
  });
});
