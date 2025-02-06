

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAssetImage } from "./utils";

interface MediaItem {
  url: string;
  description?: string;
}

interface MediaGalleryProps {
  media: MediaItem[];
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({
  media,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % media.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + media.length) % media.length
    );
  };

  return (
    <section className="py-24 px-4 bg-secondary/5">
      <div className="container mx-auto space-y-12">
        <h2 className="text-3xl font-bold text-center">Multimedia Material</h2>
        {/* Slider principal */}
        <div className="relative group max-w-5xl mx-auto">
          <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-border/50 relative">
            <img
              src={getAssetImage(media[currentImageIndex].url)}
              alt={
                media[currentImageIndex].description || "Project Media"
              }
              width={1600}
              height={900}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 flex items-end p-6">
              <p className="text-white text-lg font-medium">
                {media[currentImageIndex].description}
              </p>
            </div>
          </div>

          {/* Controles del slider */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full px-4 flex justify-between">
            <Button
              variant="ghost"
              size="lg"
              className="rounded-full p-3 bg-background/80 hover:bg-background"
              onClick={prevImage}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="rounded-full p-3 bg-background/80 hover:bg-background"
              onClick={nextImage}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>

          {/* Indicadores */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {media.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-primary" : "bg-border/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Galería de miniaturas */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {media.map((mediaItem, index) => (
            <img
              key={index}
              src={getAssetImage(mediaItem.url)}
              alt={mediaItem.description || `Media ${index + 1}`}
              className={`cursor-pointer object-cover rounded-md border ${
                index === currentImageIndex
                  ? "border-primary"
                  : "border-transparent"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaGallery;
