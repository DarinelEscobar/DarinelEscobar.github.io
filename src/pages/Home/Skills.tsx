import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import useSkillSections from "@/hooks/useSkillSections";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { usePortfolioContent } from "@/lib/portfolioContent";
import { getDelay, getRevealProps } from "@/lib/motionPresets";

const sectionOrder = [
  "technical_skills",
  "frontend_development",
  "backend_development",
  "databases",
  "devOps",
  "mobile_development",
  "tools",
  "languages",
  "certifications",
  "soft_skills",
];

const getSpanClass = (sectionId: string) => {
  if (
    sectionId === "technical_skills" ||
    sectionId === "frontend_development" ||
    sectionId === "backend_development" ||
    sectionId === "tools"
  ) {
    return "md:col-span-2";
  }

  return "md:col-span-1";
};

const Skills: React.FC = () => {
  const skillSections = useSkillSections();
  const {
    ui: { home },
  } = usePortfolioContent();
  const reduceMotion = useReducedMotion();
  const orderedSections = [...skillSections].sort((sectionA, sectionB) => {
    const indexA = sectionOrder.indexOf(sectionA.id);
    const indexB = sectionOrder.indexOf(sectionB.id);

    return (
      (indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA) -
      (indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB)
    );
  });

  return (
    <section className="relative flex min-h-screen min-h-[100dvh] w-full items-center overflow-hidden bg-whi px-5 py-24 text-dar sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <motion.h2
              {...getRevealProps(reduceMotion)}
              className="font-lat text-4xl font-bold leading-none tracking-tight text-dar sm:text-5xl"
            >
              {home.skills.titlePrefix}{" "}
              <span className="text-[rgb(var(--cobalt))]">
                {home.skills.titleHighlight}
              </span>
            </motion.h2>
            <p className="font-lat text-base leading-7 text-dar/68">
              {home.skills.subtitle}
            </p>
          </div>

          <div className="hidden h-px flex-1 bg-gradient-to-r from-[rgba(var(--cobalt),0.5)] to-transparent md:block" />
        </div>

        <div className="grid max-h-none grid-cols-1 gap-3 overflow-visible md:max-h-[calc(100dvh-14rem)] md:grid-cols-4 md:overflow-y-auto">
          {orderedSections.map((section, index) => (
            <motion.article
              key={section.id}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.42, delay: getDelay(index, 0.025), ease: "easeOut" }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-dar/10 bg-white/55 p-4 shadow-[0_14px_36px_rgba(15,23,42,0.06)] backdrop-blur-md transition-colors duration-300 hover:border-[rgba(var(--cobalt),0.42)] dark:border-white/10 dark:bg-white/[0.04]",
                getSpanClass(section.id),
              )}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--cobalt),0.45)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-dar/10 bg-whi text-[rgb(var(--cobalt))] dark:border-white/10">
                  {React.cloneElement(section.icon as React.ReactElement, {
                    className: "h-5 w-5",
                    style: { color: "rgb(var(--cobalt))" },
                  })}
                </div>
                <h3 className="font-rob text-sm font-bold text-dar">
                  {section.title}
                </h3>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {section.skills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="secondary"
                    className="flex items-center gap-1.5 rounded-full border border-dar/10 bg-whi/75 px-2.5 py-1 font-lat text-xs font-normal text-dar/72 transition-colors hover:border-[rgba(var(--cobalt),0.45)] hover:text-dar dark:border-white/10 dark:bg-white/[0.06]"
                  >
                    {React.cloneElement(skill.icon as React.ReactElement, {
                      className: "h-3 w-3",
                      style: { color: "rgb(var(--cobalt))" },
                    })}
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
