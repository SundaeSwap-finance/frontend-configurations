import { useState, useEffect } from "react";

export type MenuState = {
  hasBeenOpened: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useMenuState = (isMenuOpenArg: boolean): MenuState => {
  const [isOpen, setIsOpen] = useState(isMenuOpenArg);
  const [hasBeenOpened, setHasBeenOpened] = useState(isMenuOpenArg);
  useEffect(() => {
    if (isOpen) {
      setHasBeenOpened(true);
    }
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
    hasBeenOpened,
  };
};
