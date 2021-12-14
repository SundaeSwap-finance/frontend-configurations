import { TJsonAsset } from '../model-json.types';
import { TCardanoTokenMetadata } from './cardano-metadata-registry.types';

export class Asset implements TJsonAsset {
  readonly id: string;
  readonly policyId: string;
  readonly name: string;
  readonly decimals: number;
  readonly logoUrl?: string | null;
  readonly ticker?: string | null;
  readonly description?: string | null;
  readonly websiteUrl?: string | null;
  readonly dateListed?: string | null;

  static getNativeAssetId(policyId: string, hexAssetName: string): string {
    return `${policyId}.${hexAssetName}`;
  }

  static getSubject(policyId: string, hexAssetName: string): string {
    return `${policyId}${hexAssetName}`;
  }

  static fromAssetId(assetId: string): Asset {
    const [policyId, name] = Asset.getPolicyIdNameFromId(assetId);
    return new Asset({ id: assetId, name, policyId });
  }

  static fromNativeAssetId(assetId: string): Asset {
    const [policyId, name] = Asset.getPolicyIdNameFromNativeAssetId(assetId);
    return new Asset({ id: assetId, name, policyId });
  }

  static getPolicyIdNameFromId(assetId: string): [string, string] {
    assetId = assetId.replace(/\./, '');
    return [assetId.slice(0, 56), assetId.substring(56)];
  }

  static getPolicyIdNameFromNativeAssetId(assetId: string): [string, string] {
    const [policyId, assetName] = Asset.getPolicyIdNameFromId(assetId);
    return [policyId, Buffer.from(assetName, 'hex').toString()];
  }

  static fromTokenMetadata(metadata: TCardanoTokenMetadata): Asset {
    const [policyId, assetName] = Asset.getPolicyIdNameFromId(metadata.subject);
    return new Asset({
      id: metadata.subject,
      policyId,
      name: metadata.name.value ?? assetName,
      decimals: metadata.decimals?.value,
      logoUrl: metadata.logo?.value && `data:image/png;base64,${metadata.logo.value}`,
      ticker: metadata.ticker?.value,
      description: metadata.description?.value,
      websiteUrl: metadata.url?.value,
    });
  }

  static fromJSON(asset: TJsonAsset) {
    return new Asset({
      id: asset.id,
      policyId: asset.policyId,
      name: asset.name,
      decimals: asset.decimals,
      logoUrl: asset.logoUrl,
      ticker: asset.ticker,
      description: asset.description,
      websiteUrl: asset.websiteUrl,
    });
  }

  constructor({
    id,
    policyId,
    name,
    decimals,
    logoUrl,
    ticker,
    description,
    websiteUrl,
    dateListed,
  }: {
    id: string;
    policyId?: string;
    name?: string;
    decimals?: number;
    logoUrl?: string | null;
    ticker?: string | null;
    description?: string | null;
    websiteUrl?: string | null;
    dateListed?: string | null;
  }) {
    this.id = id;
    this.policyId = policyId ?? id;
    this.name = name ?? id;
    this.decimals = decimals ?? 0; //FIXME
    this.logoUrl = logoUrl;
    this.ticker = ticker;
    this.description = description;
    this.websiteUrl = websiteUrl;
    this.dateListed = dateListed;
  }

  display() {
    return this.ticker ?? this.name;
  }

  equals(other?: Asset | string): boolean {
    return this.id === (typeof other === 'string' ? other : other?.id);
  }

  toJSON(): TJsonAsset {
    return {
      id: this.id,
      name: this.name,
      policyId: this.policyId,
      decimals: this.decimals,
      logoUrl: this.logoUrl ?? null,
      ticker: this.ticker ?? null,
      description: this.description ?? null,
      websiteUrl: this.websiteUrl ?? null,
    };
  }
}
