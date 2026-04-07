import React from "react";
import img from "../../assets/images/me.webp";
import { usePortfolioContent } from "@/lib/portfolioContent";

const MainContent: React.FC = () => {
  const {
    resume: {
      personal_info: { short_name },
    },
  } = usePortfolioContent();

  return (
    <section className="flex flex-col justify-center md:justify-between items-center bg-whi w-screen min-h-[100dvh] text-dar gap-4 md:gap-0">
      <div className="flex flex-none md:flex-grow justify-center items-center">
        <img
          src={img}
          alt={short_name}
          width="200"
          height="300"
          className="shadow-lg rounded-md w-[200px] h-[300px] object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="flex justify-center items-center px-4 pb-4 md:pb-8 w-full">
        <h1 className="custom-title font-cor text-dar text-4xl tracking-wide">
          {short_name}
        </h1>
      </div>
    </section>
  );
};

export default MainContent;
