// src/hooks/useMediaQuery.ts
import { useEffect, useState } from "react";

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQueryList = window.matchMedia(query);

    const updateMatches = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", updateMatches);

    return () => mediaQueryList.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
};

export default useMediaQuery;
