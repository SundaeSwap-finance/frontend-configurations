import { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";

export function useMenuScroll(): { showHeader: boolean } {
  const [showHeader, setShowHeader] = useState(true);
  const prevOffset = useRef(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isTopPos = currentOffset === 0;
      const isBottomPos = window.document.body.clientHeight === currentOffset + window.innerHeight;

      if (isTopPos) {
        setShowHeader(true);
      }
      // to avoid CLS we will not trigger any action once a user has reached the bottom of the page
      else if (!isBottomPos) {
        if (currentOffset < prevOffset.current) {
          // User has scrolled up
          setShowHeader(true);
        } else {
          // User has scrolled down
          setShowHeader(false);
        }
      }

      prevOffset.current = currentOffset;
    };

    const debouncedScrollHandler = debounce(handleScroll, 200);

    window.addEventListener("scroll", debouncedScrollHandler);
    return () => {
      window.removeEventListener("scroll", debouncedScrollHandler);
    };
  }, []);

  return {
    showHeader,
  };
}
