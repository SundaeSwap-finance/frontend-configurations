import { useEffect, useState } from "react";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

type Options = {
  copiedTimeout?: number;
};

export function useCopyToClipboard({ copiedTimeout }: Options): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(null);
      return false;
    }
  };

  useEffect(() => {
    if (copiedText && copiedTimeout) {
      setTimeout(() => {
        setCopiedText(null);
      }, copiedTimeout);
    }
  }, [copiedText, copiedTimeout]);

  return [copiedText, copy];
}