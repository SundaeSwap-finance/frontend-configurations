import { RefObject, useEffect } from "react";

type AnyEvent = MouseEvent | TouchEvent;

function useOnOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: AnyEvent) => void,
  parentRef: RefObject<HTMLDivElement | HTMLButtonElement>
): void {
  useEffect(() => {
    const listener = (event: AnyEvent) => {
      const el = ref?.current;
      const parentEl = parentRef?.current;

      if (!el || el.contains(event.target as Node) || parentEl?.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(`mousedown`, listener);
    document.addEventListener(`touchstart`, listener);

    return () => {
      document.removeEventListener(`mousedown`, listener);
      document.removeEventListener(`touchstart`, listener);
    };
  }, [ref, handler, parentRef]);
}

export default useOnOutsideClick;
