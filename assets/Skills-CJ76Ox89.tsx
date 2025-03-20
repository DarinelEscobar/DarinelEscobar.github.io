import React, { useState, useEffect } from "react"


import { motion } from "framer-motion"


import {
  Code2 as Code,
  Cloud,
  Database,
  Smartphone,
  Server,
  LayoutPanelLeft,
  PocketKnife,
  HeartHandshake,
  Speech,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"


import * as SiIcons from "react-icons/si"
import * as FaIcons from "react-icons/fa"
import * as GiIcons from "react-icons/gi"


import data from "@data/data.json"


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




const lucideMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  code: Code,
  Code: Code,
  cloud: Cloud,
  Cloud: Cloud,
  database: Database,
  Database: Database,
  smartphone: Smartphone,
  Smartphone: Smartphone,
  server: Server,
  Server: Server,
  layoutpanelleft: LayoutPanelLeft,
  LayoutPanelLeft: LayoutPanelLeft,
  pocketknife: PocketKnife,
  PocketKnife: PocketKnife,
  hearthandshake: HeartHandshake,
  HeartHandshake: HeartHandshake,
  speech: Speech,
  Speech: Speech,
  award: Award,
  Award: Award,
}

function getIcon(iconName: string, library: string) {
  switch (library.toLowerCase()) {
    case "lucide-react": {
      const LucideIcon = lucideMap[iconName] || Code
      return <LucideIcon className="w-5 h-5" />
    }
    case "fa":
      return React.createElement(FaIcons[iconName as keyof typeof FaIcons] || FaIcons.FaQuestion, {
        className: "h-5 w-5",
      })
    case "si":
      return React.createElement(SiIcons[iconName as keyof typeof SiIcons] || SiIcons.SiCodio, {
        className: "h-5 w-5",
      })
    case "gi":
      return React.createElement(GiIcons[iconName as keyof typeof GiIcons] || GiIcons.GiInfo, {
        className: "h-5 w-5",
      })
    default:
      return <Code className="w-5 h-5" />
  }
}

function formatSectionTitle(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}




interface Skill {
  name: string
  icon: string
  library: string
  color: string
}

interface SectionIcon {
  name: string
  library: string
  color: string
}

interface CertificationItem {
  name: string
  link: string
  imageKey: string
}

interface CombinedSection {
  section_icon?: SectionIcon
  skills?: Skill[]
  languages_list?: Skill[]
  items?: CertificationItem[]
}

const combinedSections = {
  ...data.resume.Skills_Technologies,
  certifications: data.resume.certifications,
}

const sectionKeys = Object.keys(combinedSections)

function createSkillSections(): {
  title: string
  icon: React.ReactNode
  color: string
  skills: { name: string; icon: React.ReactNode; color: string }[]
}[] {
  return sectionKeys.map((key) => {
    const sectionObj: CombinedSection = combinedSections[key]
    const secIcon = sectionObj.section_icon || { name: "code", library: "lucide-react", color: "#333" }

    let skillArray: Skill[] = []
    if (sectionObj.skills) {
      skillArray = sectionObj.skills
    } else if (sectionObj.languages_list) {
      skillArray = sectionObj.languages_list
    } else if (sectionObj.items) {

      skillArray = sectionObj.items.map((cert) => ({
        name: cert.name,
        icon: "award",
        library: "lucide-react",
        color: secIcon.color,
      }))
    }

    const finalSkills = skillArray.map((sk) => ({
      name: sk.name,
      icon: getIcon(sk.icon, sk.library),
      color: sk.color,
    }))

    return {
      title: formatSectionTitle(key),
      icon: getIcon(secIcon.name, secIcon.library),
      color: secIcon.color,
      skills: finalSkills,
    }
  })
}




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
  const skillSections = createSkillSections()

  const [api, setApi] = useState<any>(null)
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
    <div className="relative bg-gray-50 w-screen min-h-screen overflow-hidden font-sans">
      {/* Fondo sutil */}
      <div className="absolute inset-0 bg-white opacity-40 pointer-events-none" />

      {/* Carousel principal */}
      <Carousel
        setApi={setApi}
        className="relative mx-auto py-12 w-full max-w-6xl"
        opts={{
          align: "center",
          loop: true,


        }}
      >
        <CarouselContent
          className={cn(
            "relative flex",

            "overflow-visible px-4"
          )}
        >
          {skillSections.map((section, index) => (
            <CarouselItem
              key={index}

              className={cn(
                "transition-all duration-500 ease-in-out origin-center",
                "basis-[70%] md:basis-[40%] lg:basis-[30%] mx-auto",
                getSlideClasses(index, current, count)
              )}
            >
              <Card
                className={cn(
                  "h-full w-full border border-gray-200 bg-white rounded-3xl shadow-lg",
                  "overflow-hidden flex flex-col items-center justify-center"
                )}
              >
                <CardHeader className="p-6 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div
                      className="flex justify-center items-center bg-white shadow-sm p-4 border border-gray-200 rounded-full"
                      style={{ minWidth: "60px", minHeight: "60px" }}
                    >
                      {React.cloneElement(section.icon as React.ReactElement, {
                        style: { color: "#333" },
                        className: "h-8 w-8",
                      })}
                    </div>
                    <CardTitle className="font-bold text-gray-800 text-2xl">
                      {section.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 w-full">
                  <div className="place-items-center gap-3 grid grid-cols-2">
                    {section.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className={cn(
                          "flex items-center gap-2 py-2 px-3",
                          "bg-white border border-gray-200 shadow-sm",
                          "text-sm font-medium text-gray-700 rounded-md"
                        )}
                      >
                        {React.cloneElement(skill.icon as React.ReactElement, {
                          style: { color: "#555" },
                          className: "h-5 w-5",
                        })}
                        <span>{skill.name}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Botones de navegación */}
        <CarouselPrevious
          className={cn(
            "hidden md:flex absolute top-1/2 -translate-y-1/2 -left-8",
            "bg-white border border-gray-200 shadow-md p-2 rounded-full",
            "hover:shadow-lg transition-all duration-300"
          )}
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </CarouselPrevious>
        <CarouselNext
          className={cn(
            "hidden md:flex absolute top-1/2 -translate-y-1/2 -right-8",
            "bg-white border border-gray-200 shadow-md p-2 rounded-full",
            "hover:shadow-lg transition-all duration-300"
          )}
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </CarouselNext>

        {/* Indicadores de posición */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                current === i ? "bg-gray-800 scale-125" : "bg-gray-300 hover:bg-gray-400"
              )}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}

export default Skills
