

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAssetImage } from "./utils";


interface HeroSectionProps {
  project: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ project }) => {
  return (
    <section className="min-h-[50vh] flex items-center bg-gradient-to-r from-primary/5 to-secondary/5 py-24 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Información principal del proyecto */}
        <div className="w-full lg:w-1/2 space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">{project.name}</h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            {project.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {project.url && (
              <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-6 text-lg"
              onClick={() => window.open(project.url, "_blank")}
            >
              Explore Project
              </Button>
            )}
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-6 text-lg"
              onClick={() => window.open(project.repository, "_blank")}
            >
              View Repository
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Imagen principal del proyecto */}
        <div className="w-full lg:w-1/2 relative group">
          <div className="rounded-xl overflow-hidden shadow-2xl border border-border/50">
            {project.media && project.media.length > 0 ? (
              <img
                src={getAssetImage(project.media[0].url)}
                alt={project.media[0].description || "Project Image"}
                width={800}
                height={500}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-white text-lg font-medium">
              Interactive preview of the project
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

