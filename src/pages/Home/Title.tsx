import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Footer from "@/components/Footer/Footer";
import { usePortfolioContent } from "@/lib/portfolioContent";
import { getRevealProps } from "@/lib/motionPresets";

const Title: React.FC = () => {
  const {
    resume: {
      personal_info: { email },
    },
    ui: { closing },
  } = usePortfolioContent();
  const reduceMotion = useReducedMotion();

  return (
    <section className="flex min-h-screen min-h-[100dvh] w-full flex-col justify-between bg-whi px-5 pt-24 text-dar sm:px-8 lg:px-12">
      <motion.div
        className="mx-auto flex w-full max-w-[1080px] flex-1 flex-col items-center justify-center py-16 text-center"
        {...getRevealProps(reduceMotion)}
      >
        <p className="font-rob text-xs font-bold text-[rgb(var(--cobalt))]">
          {closing.eyebrow}
        </p>
        <h2 className="mt-5 max-w-4xl font-lat text-4xl font-bold leading-[1.02] tracking-tight text-dar sm:text-6xl lg:text-7xl">
          {closing.title}
        </h2>
        <p className="mt-5 max-w-2xl font-lat text-lg leading-8 text-dar/70">
          {closing.body}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center justify-center rounded-full bg-[rgb(var(--cobalt))] px-6 py-3 font-rob text-sm font-bold text-white shadow-[0_18px_44px_rgba(37,99,235,0.28)] transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cobalt))] focus:ring-offset-2 focus:ring-offset-whi active:translate-y-0"
          >
            {closing.primaryCta}
          </a>
          <Link
            to="/Project"
            className="inline-flex items-center justify-center rounded-full border border-dar/15 px-6 py-3 font-rob text-sm font-bold text-dar transition-colors duration-300 hover:border-[rgb(var(--cobalt))] hover:text-[rgb(var(--cobalt))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cobalt))] focus:ring-offset-2 focus:ring-offset-whi"
          >
            {closing.secondaryCta}
          </Link>
        </div>
      </motion.div>

      <Footer />
    </section>
  );
};

export default Title;
