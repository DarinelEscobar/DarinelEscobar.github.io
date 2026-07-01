import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import img from "../../assets/images/me.webp";
import { usePortfolioContent } from "@/lib/portfolioContent";

const MainContent: React.FC = () => {
  const {
    resume: {
      personal_info: { short_name, rol },
    },
    ui: {
      home: { hero },
    },
  } = usePortfolioContent();
  const reduceMotion = useReducedMotion();

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <section className="relative flex min-h-[100dvh] w-full items-center overflow-hidden bg-whi px-5 py-24 text-dar sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--cobalt),0.55)] to-transparent" />

      <div className="mx-auto grid min-w-0 w-full max-w-[1320px] items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.72fr)] lg:gap-16">
        <motion.div
          className="w-full min-w-0 space-y-7"
          style={{ maxWidth: "min(48rem, calc(100vw - 2.5rem))" }}
          {...reveal}
        >
          <p className="font-rob text-xs font-bold text-[rgb(var(--cobalt))]">
            {hero.eyebrow}
          </p>

          <div className="space-y-5">
            <h1 className="max-w-full break-words font-lat text-[2rem] font-bold leading-[1.02] tracking-tight text-dar sm:text-5xl lg:text-7xl">
              {hero.headline}{" "}
              <span className="block text-[rgb(var(--cobalt))]">{hero.highlight}</span>
            </h1>
            <p className="max-w-full font-lat text-base leading-7 text-dar/72 sm:max-w-2xl sm:text-lg">
              {hero.body}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/Project"
              className="inline-flex w-full items-center justify-center rounded-full bg-[rgb(var(--cobalt))] px-6 py-3 font-rob text-sm font-bold text-white shadow-[0_18px_44px_rgba(37,99,235,0.28)] transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cobalt))] focus:ring-offset-2 focus:ring-offset-whi active:translate-y-0 sm:w-auto"
            >
              {hero.primaryCta}
            </Link>
            <Link
              to="/Contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-dar/15 px-6 py-3 font-rob text-sm font-bold text-dar transition-colors duration-300 hover:border-[rgb(var(--cobalt))] hover:text-[rgb(var(--cobalt))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cobalt))] focus:ring-offset-2 focus:ring-offset-whi sm:w-auto"
            >
              {hero.secondaryCta}
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[min(100%,440px)] lg:ml-auto"
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, scale: 0.96 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] },
              })}
        >
          <div className="absolute inset-0 rounded-[2rem] border border-dar/10 bg-white/45 shadow-[0_30px_80px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-white/[0.04] sm:-inset-5" />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-dar/10 bg-white p-2 shadow-[0_18px_60px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-white/[0.06]">
            <img
              src={img}
              alt={short_name}
              width="480"
              height="640"
              className="aspect-[4/5] w-full rounded-[1.1rem] object-cover"
              decoding="async"
            />
          </div>

          <div className="absolute -bottom-5 left-6 right-6 rounded-2xl border border-dar/10 bg-whi/90 px-5 py-4 shadow-[0_18px_46px_rgba(15,23,42,0.16)] backdrop-blur-md dark:border-white/10 dark:bg-whi/90">
            <p className="font-rob text-xs font-bold text-dar/55">
              {short_name}
            </p>
            <p className="mt-1 font-lat text-sm font-bold text-dar">{rol}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MainContent;
