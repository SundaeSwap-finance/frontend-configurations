import { useCallback, useEffect, useState } from "react";

export const useKeyPress = (targetKey: string): boolean => {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  // If pressed key is our target key then set to true
  const downHandler = useCallback(
    ({ key }: { key: string }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    },
    [targetKey]
  );

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [downHandler]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
};
