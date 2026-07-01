import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePortfolioContent } from "@/lib/portfolioContent";
import { getDelay, getRevealProps } from "@/lib/motionPresets";

const AboutMe: React.FC = () => {
  const {
    ui: {
      home: { about },
    },
  } = usePortfolioContent();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen min-h-[100dvh] items-center overflow-hidden bg-whi px-5 py-24 text-dar sm:px-8 lg:px-12">
      <div className="mx-auto grid w-full max-w-[1320px] gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <motion.div className="space-y-5" {...getRevealProps(reduceMotion)}>
          <p className="font-rob text-xs font-bold text-[rgb(var(--cobalt))]">
            {about.eyebrow}
          </p>
          <h2 className="max-w-2xl font-lat text-4xl font-bold leading-[1.02] tracking-tight text-dar sm:text-5xl lg:text-6xl">
            {about.title}
          </h2>
        </motion.div>

        <motion.div className="space-y-8" {...getRevealProps(reduceMotion, 0.04)}>
          <p className="max-w-3xl font-lat text-lg leading-8 text-dar/72 lg:text-xl">
            {about.body}
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {about.highlights.map((item, index) => (
              <motion.article
                key={item.title}
                className="group rounded-2xl border border-dar/10 bg-white/55 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-md transition-colors duration-300 hover:border-[rgba(var(--cobalt),0.42)] dark:border-white/10 dark:bg-white/[0.04]"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: getDelay(index, 0.05), ease: "easeOut" }}
              >
                <div className="mb-5 h-1 w-10 rounded-full bg-[rgb(var(--cobalt))]" />
                <h3 className="font-rob text-sm font-bold text-dar">
                  {item.title}
                </h3>
                <p className="mt-3 font-lat text-sm leading-6 text-dar/68">
                  {item.body}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
