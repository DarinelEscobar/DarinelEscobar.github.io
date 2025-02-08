import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Expand, Minimize } from "lucide-react";
import { getAssetImage } from "./utils";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useHotkeys } from "react-hotkeys-hook";

interface MediaItem {
  url: string;
  description?: string;
}

interface MediaGalleryProps {
  media: MediaItem[];
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
}

const galleryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1 },
  },
};

const MediaGallery: React.FC<MediaGalleryProps> = ({
  media,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const nextImage = () => {
    setIsLoading(true);
    setCurrentImageIndex((currentImageIndex + 1) % media.length);
  };

  const prevImage = () => {
    setIsLoading(true);
    setCurrentImageIndex(
      (currentImageIndex - 1 + media.length) % media.length
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    trackMouse: true,
  });

  useHotkeys("left", prevImage);
  useHotkeys("right", nextImage);
  useHotkeys("esc", () => setIsFullscreen(false));

  useEffect(() => {
    const img = new Image();
    img.src = getAssetImage(media[currentImageIndex].url);
    img.onload = () => {
      setIsLoading(false);
      setImageDimensions({ width: img.width, height: img.height });
    };
  }, [currentImageIndex, media]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <motion.section
      className={`${
        isFullscreen
          ? "fixed inset-0 z-50 bg-black/90 backdrop-blur-lg"
          : "bg-transparent"
      }`}
      variants={galleryVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-6 mx-auto container">
        <h2 className="font-bold text-3xl text-center text-gray-800 dark:text-gray-100">
          Multimedia Material
        </h2>

        <div className="group relative mx-auto max-w-6xl" {...handlers}>
          <div
            className={`relative bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-600/50 shadow-xl border rounded-xl ${
              isFullscreen ? "h-[90vh]" : "max-h-[80vh]"
            } flex items-center justify-center`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative flex justify-center items-center w-full h-full"
              >
                {isLoading && (
                  <div className="absolute inset-0 flex justify-center items-center">
                    <div className="border-t-2 border-b-2 border-blue-500 rounded-full w-12 h-12 animate-spin" />
                  </div>
                )}
                <img
                  src={getAssetImage(media[currentImageIndex].url)}
                  alt={media[currentImageIndex].description || "Project Media"}
                  className={`${
                    isLoading ? "opacity-0" : "opacity-100"
                  } object-contain w-full h-full transition-opacity duration-300`}
                  style={{
                    maxWidth: imageDimensions
                      ? `${Math.min(imageDimensions.width, 1920)}px`
                      : "auto",
                  }}
                />
                <div className="right-0 bottom-0 left-0 absolute bg-gradient-to-t from-black/80 via-black/50 to-transparent px-6 pt-12 pb-4 pointer-events-none">
                  <p className="font-medium text-lg text-white/90">
                    {media[currentImageIndex].description}
                  </p>
                  {imageDimensions && (
                    <p className="mt-1 text-sm text-white/60">
                      {imageDimensions.width}×{imageDimensions.height}px
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="top-4 right-4 absolute flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="bg-black/20 hover:bg-black/30 text-white/80 hover:text-white"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5" />
                ) : (
                  <Expand className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Controles del slider */}
          <div className="top-1/2 absolute flex justify-between px-4 w-full -translate-y-1/2">
            <Button
              aria-label="Previous image"
              variant="ghost"
              size="lg"
              className="bg-white/80 hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-900/80 shadow-lg p-3 rounded-full transition-all hover:scale-105"
              onClick={prevImage}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
            <Button
              aria-label="Next image"
              variant="ghost"
              size="lg"
              className="bg-white/80 hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-900/80 shadow-lg p-3 rounded-full transition-all hover:scale-105"
              onClick={nextImage}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </div>

          {/* Indicadores */}
          <div className="bottom-4 left-1/2 absolute flex gap-2 bg-black/30 dark:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full -translate-x-1/2">
            <span className="text-sm text-white">
              {currentImageIndex + 1} / {media.length}
            </span>
          </div>
        </div>

        {/* Galería de miniaturas */}
        <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-4">
          {media.map((mediaItem, index) => (
            <motion.div
              key={index}
              className={`relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                index === currentImageIndex
                  ? "border-blue-500 scale-105"
                  : "border-transparent hover:scale-100"
              }`}
              whileHover={{ scale: 1.05 }}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img
                src={getAssetImage(mediaItem.url)}
                alt={mediaItem.description || `Media ${index + 1}`}
                className="w-full h-32 lg:h-40 xl:h-48 object-cover"
              />
              {index === currentImageIndex && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default MediaGallery;