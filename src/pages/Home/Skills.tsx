import React from "react"
import { motion } from "framer-motion"
import useSkillSections from "@/hooks/useSkillSections"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { usePortfolioContent } from "@/lib/portfolioContent"

const Skills: React.FC = () => {
  const skillSections = useSkillSections()
  const {
    ui: { home },
  } = usePortfolioContent()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  }

  // Configuration for specific grid spans to create the "Bento" look
  const getSpanClass = (sectionId: string) => {
    if (
      sectionId === "technical_skills" ||
      sectionId === "frontend_development" ||
      sectionId === "backend_development"
    ) {
      return "md:col-span-2 lg:col-span-2"
    }
    return "col-span-1"
  }

  return (
    // Restored original background hierarchy
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-radial from-white via-[#ECECEC] to-[#DCDCDC] px-4 py-8 dark:from-[#1F1F1F] dark:via-[#2C2C2C] dark:to-[#3B3B3B] md:px-8 lg:py-4">

      {/* Decorative background elements can remain but subtle or removed if they clash with original BG. Keeping them off for "fit in single screen" cleanness or subtle.
          The user asked to keep original hierarchy, usually implies the main gradient. I will omit the 'blobs' to strictly follow 'original color hierarchy' and 'professional' look. */}

      <div className="z-10 w-full max-w-7xl">
        {/* Compact Header */}
        <div className="mb-6 flex flex-col items-center justify-between gap-4 md:mb-8 md:flex-row">
          <div className="text-center md:text-left">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl"
            >
              {home.skills.titlePrefix}{" "}
              <span className="text-blue-600 dark:text-blue-400">{home.skills.titleHighlight}</span>
            </motion.h2>
            <motion.p
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-sm text-gray-500 dark:text-gray-400"
            >
              {home.skills.subtitle}
            </motion.p>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 md:w-32"
          />
        </div>

        {/* Dense Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          {skillSections.map((section, index) => {
            const spanClass = getSpanClass(section.id)

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                className={cn(
                  // Adjusted card background to match original hierarchy: more opaque to stand out against the gradient, or glass
                  "group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white/60 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-lg dark:border-gray-700/50 dark:bg-gray-800/60 dark:shadow-black/30",
                  spanClass
                )}
              >
                {/* Hover Glow Effect */}
                <div
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                  style={{ backgroundColor: section.color }}
                />

                <div className="flex flex-col gap-3">
                  {/* Card Header */}
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/80 text-xl shadow-sm dark:bg-gray-700/80"
                      style={{ color: section.color }}
                    >
                      {React.cloneElement(section.icon as React.ReactElement, {
                        className: "h-5 w-5",
                      })}
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      {section.title}
                    </h3>
                  </div>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-2">
                    {section.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="flex items-center gap-1.5 border border-gray-100 bg-white/50 px-2.5 py-1 text-xs font-normal text-gray-600 transition-colors hover:border-gray-300 hover:bg-white dark:border-gray-700 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:border-gray-600"
                      >
                         {/* Very small icon */}
                        {React.cloneElement(skill.icon as React.ReactElement, {
                          className: "h-3 w-3",
                          style: { color: skill.color },
                        })}
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default Skills
