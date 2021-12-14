/**
 * https://github.com/cardano-foundation/cardano-token-registry#semantic-content-of-registry-entries
 */
export type TCardanoTokenMetadata = {
  /**
   * The base16-encoded policyId + base16-encoded assetName
   */
  subject: string;
  /**
   * The script that hashes to the policyId
   */
  policy: string;
  /**
   * A human-readable name for the subject, suitable for use in an interface
   */
  name: TMetadataValue;
  /**
   * A human-readable description for the subject, suitable for use in an interface
   */
  description: TMetadataValue;
  /**
   * A human-readable ticker name for the subject, suitable for use in an interface
   */
  ticker?: TMetadataValue;
  /**
   * A HTTPS URL (web page relating to the token)
   */
  url?: TMetadataValue;
  /**
   * A PNG image file as a byte string
   */
  logo?: TMetadataValue;
  /**
   * how many decimals to the token
   */
  decimals?: TMetadataValue<number>;
};

type TMetadataValue<V = string> = {
  sequenceNumber: number;
  value: V;
  signatures: TSignature[];
};

type TSignature = { signature: string; publicKey: string };
