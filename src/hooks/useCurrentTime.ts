// src/components/Header/hooks/useCurrentTime.ts
import { useState, useEffect } from "react";

const useCurrentTime = (locale = "en-US") => {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return formattedTime;
};

export default useCurrentTime;
