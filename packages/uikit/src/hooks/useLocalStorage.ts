import { Dispatch, useEffect, useState, SetStateAction } from "react";

export const useLocalStorage = (
  key: string,
  defaultValue?: string
): [string | void, Dispatch<SetStateAction<string | void>>] => {
  const [value, setValue] = useState<string | void>(
    () => window.localStorage.getItem(key) ?? defaultValue
  );

  useEffect(() => {
    if (typeof value !== "string") return window.localStorage.removeItem(key);
    window.localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
