import { Asset } from "./Asset";
import { WMTMetadataJson } from "./__fixtures__/wmt-metadata.json";

describe("Asset", () => {
  test(".fromTokenMetadata()", () => {
    const wmtAsset = Asset.fromTokenMetadata(WMTMetadataJson);
    expect(wmtAsset.websiteUrl).toBe("https://worldmobiletoken.com");
    expect(wmtAsset.name).toBe("World Mobile Token");
    expect(wmtAsset.ticker).toBe("WMT");
    expect(wmtAsset.decimals).toBe(6);
    expect(wmtAsset.id).toBe(
      "1d7f33bd23d85e1a25d87d86fac4f199c3197a2f7afeb662a0f34e1e776f726c646d6f62696c65746f6b656e"
    );
    expect(wmtAsset.description).toBeTruthy();
    expect(wmtAsset.logoUrl).toBeTruthy();
  });

  test("#constructor", () => {
    const testAsset = new Asset({ id: "test", name: "test" });
    expect(testAsset.id).toBe("test");
    expect(testAsset.name).toBe("test");
    expect(testAsset.decimals).toBe(0);
  });
});
