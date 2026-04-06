import React from "react";
import useCurrentTime from "@/hooks/useCurrentTime";

interface CurrentTimeProps {
  className?: string;
  locale: string;
}

const CurrentTime: React.FC<CurrentTimeProps> = ({ className, locale }) => {
  const formattedTime = useCurrentTime(locale);

  return <span className={className}>{formattedTime}</span>;
};

export default CurrentTime;
