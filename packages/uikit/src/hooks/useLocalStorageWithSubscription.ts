import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useLocalStorageWithSubscription = (
  key: string,
  initialValue?: string
): [string | void, Dispatch<SetStateAction<string | void>>] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!global.window) return [] as any;
  // based on https://usehooks-typescript.com/react-hook/use-local-storage
  const readValueWithPersistedInitialValue = () => {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue) return storedValue;
    if (!initialValue) return;
    window.localStorage.setItem(key, initialValue);
    return initialValue;
  };

  const [storedValue, setStoredValue] = useState<string | void>(readValueWithPersistedInitialValue);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue: Dispatch<SetStateAction<string | void>> = (value) => {
    if (typeof value !== "string") {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, value);
    }
    // Save state
    setStoredValue(value);
    // We dispatch a custom event so every useLocalStorageWithSubscription hook are notified
    window.dispatchEvent(new Event("local-storage"));
  };

  useEffect(() => {
    setStoredValue(readValueWithPersistedInitialValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValueWithPersistedInitialValue());
    };
    // this only works for other documents, not the current one
    window.addEventListener("storage", handleStorageChange);
    // this is a custom event, triggered in writeValueToLocalStorage
    window.addEventListener("local-storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage", handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, setValue];
};

export default useLocalStorageWithSubscription;
