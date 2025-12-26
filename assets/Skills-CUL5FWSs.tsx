import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { EmblaCarouselType } from "embla-carousel-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import useSkillSections from "@/hooks/useSkillSections"

const MAX_VISIBLE_SKILLS = 8

/**
 * Dada la posición `index` y la posición central `current`,
 * calculamos la “distancia” al centro y retornamos clases
 * de Tailwind para lograr escalas y opacidades diferentes.
 *
 * - Centro: más grande (scale-110)
 * - Inmediatos al centro: tamaño medio (scale-90)
 * - Más lejanos: pequeño (scale-75) o menor
 */
function getSlideClasses(index: number, current: number, count: number) {
  const dist = (index - current + count) % count

  switch (dist) {
    case 0:
      return "z-30 scale-110 opacity-100"
    case 1:
    case count - 1:
      return "z-20 scale-90 opacity-95"
    case 2:
    case count - 2:
      return "z-10 scale-75 opacity-90"
    default:
      return "z-0 scale-50 opacity-0 pointer-events-none"
  }
}

const Skills: React.FC = () => {
  const skillSections = useSkillSections()
  const [api, setApi] = useState<EmblaCarouselType | null>(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div
      className="relative flex items-center justify-center w-screen min-h-screen overflow-visible font-sans bg-gradient-radial from-white via-[#ECECEC] to-[#DCDCDC] dark:from-[#1F1F1F] dark:via-[#2C2C2C] dark:to-[#3B3B3B]"
    >
      <Carousel
        setApi={setApi}
        className="relative mx-auto py-12 w-full max-w-6xl overflow-visible"
        opts={{ align: "center", loop: true }}
      >
        <CarouselContent className={cn("relative flex px-4")} overflow="visible">
          {skillSections.map((section, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "origin-center transition-[transform,opacity] duration-700 ease-in-out basis-[70%] md:basis-[40%] lg:basis-[30%] mx-auto",
                getSlideClasses(index, current, count)
              )}
            >
              <Card
                className={cn(
                  "h-[28rem] w-full rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 dark:border-gray-700 shadow-lg",
                  "flex flex-col overflow-hidden",
                  "transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
                )}
              >
                <CardHeader className="p-8 text-center">
                  <div className="flex flex-col items-center gap-6">
                    <div
                      className="flex items-center justify-center rounded-full border border-gray-200 bg-white dark:bg-gray-700 dark:border-gray-600 shadow-sm p-4"
                      style={{ minWidth: "60px", minHeight: "60px" }}
                    >
                      {React.cloneElement(section.icon as React.ReactElement, {
                        className: "h-8 w-8",
                        style: { color: section.color },
                      })}
                    </div>
                    <CardTitle className="max-w-[10rem] truncate text-2xl font-bold text-gray-800 dark:text-gray-100">
                      {section.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 w-full p-8">
                  <div className="grid h-full grid-cols-2 grid-rows-4 gap-4 place-items-center">
                    {section.skills.slice(0, MAX_VISIBLE_SKILLS).map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className={cn(
                          "flex w-full items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium",
                          "bg-white border border-gray-200 text-gray-700 shadow-sm",
                          "dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        )}
                      >
                        {React.cloneElement(skill.icon as React.ReactElement, {
                          className: "h-5 w-5",
                          style: { color: skill.color },
                        })}
                        <span className="text-center w-full leading-tight">{skill.name}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className={cn(
            "hidden md:flex absolute top-1/2 -translate-y-1/2 -left-8",
            "p-2 rounded-full border bg-white text-gray-700 shadow-md",
            "hover:shadow-lg transition-all duration-300",
            "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
          )}
        >
          <ChevronLeft className="w-6 h-6" />
        </CarouselPrevious>
        <CarouselNext
          className={cn(
            "hidden md:flex absolute top-1/2 -translate-y-1/2 -right-8",
            "p-2 rounded-full border bg-white text-gray-700 shadow-md",
            "hover:shadow-lg transition-all duration-300",
            "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
          )}
        >
          <ChevronRight className="w-6 h-6" />
        </CarouselNext>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "w-12 h-12 flex items-center justify-center transition-all duration-300 rounded-full", // Touch target 48px
                // Visual states handled on the span mainly, but we can keep some strictness or move logic.
                // The original had color on the button itself.
                // Let's use the USER's suggested structure:
                // <button ...><span class="w-3 h-3 ..."></span></button>
              )}
              onClick={() => api?.scrollTo(i)}
            >
              <span
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  current === i
                    ? "bg-gray-800 dark:bg-gray-200 scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                )}
              />
            </button>
          ))}
        </div>
      </Carousel>
    </div>
  )
}

export default Skills

