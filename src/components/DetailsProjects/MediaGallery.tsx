import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Minimize,
  Loader2,
} from "lucide-react";
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
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: 0.1, ease: "easeOut" },
  },
};

// Contenedor para la lista de miniaturas, usa stagger
const thumbnailsContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// Animación de cada thumbnail
const thumbnailItem = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
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
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  const calculateImagePosition = useCallback(() => {
    if (!containerRef || !imageDimensions) return {};
    const aspectRatio = imageDimensions.width / imageDimensions.height;
    if (aspectRatio > 1) {
      return {
        width: "100%",
        height: "auto",
        maxHeight: "100%",
      };
    }
    return {
      width: "auto",
      height: "100%",
      maxWidth: "100%",
    };
  }, [containerRef, imageDimensions]);

  const nextImage = useCallback(() => {
    setIsLoading(true);
    setCurrentImageIndex((currentImageIndex + 1) % media.length);
  }, [currentImageIndex, media.length, setCurrentImageIndex]);

  const prevImage = useCallback(() => {
    setIsLoading(true);
    setCurrentImageIndex(
      (currentImageIndex - 1 + media.length) % media.length
    );
  }, [currentImageIndex, media.length, setCurrentImageIndex]);

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    trackMouse: true,
    delta: 50,
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
    img.onerror = () => {
      setIsLoading(false);
      setImageDimensions(null);
    };
  }, [currentImageIndex, media]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  return (
    <motion.section
      className={`${
        isFullscreen
          ? "fixed inset-0 z-50 bg-black/95 backdrop-blur-lg"
          : "bg-transparent relative"
      }`}
      variants={galleryVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
    >
      <div className="space-y-6 mx-auto container">
        <h2 className="mb-8 font-bold text-gray-800 dark:text-gray-100 text-3xl text-center">
          Multimedia Material
        </h2>

        <div className="group relative mx-auto max-w-6xl" {...handlers}>
          <div
            ref={setContainerRef}
            className={`relative bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-600/50 shadow-xl border rounded-xl ${
              isFullscreen ? "h-[90vh] w-[95vw]" : "max-h-[80vh]"
            } flex items-center justify-center overflow-hidden`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative flex justify-center items-center w-full h-full"
              >
                {isLoading && (
                  <div className="absolute inset-0 flex justify-center items-center bg-gray-100 dark:bg-gray-900">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                  </div>
                )}

                <img
                  src={getAssetImage(media[currentImageIndex].url)}
                  alt={
                    media[currentImageIndex].description || "Project Media"
                  }
                  className={`${
                    isLoading ? "opacity-0" : "opacity-100"
                  } transition-opacity duration-300`}
                  style={{
                    ...calculateImagePosition(),
                    objectFit: "contain",
                  }}
                />

                {/* Texto/Dimensiones sobre la imagen */}
                <div className="right-0 bottom-0 left-0 absolute bg-gradient-to-t from-black/90 via-black/70 to-transparent px-6 pt-16 pb-4 pointer-events-none">
                  <p className="drop-shadow-lg font-medium text-white/90 text-lg">
                    {media[currentImageIndex].description}
                  </p>
                  {imageDimensions && (
                    <p className="mt-1 text-white/60 text-sm">
                      {imageDimensions.width}×{imageDimensions.height}px
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Botón para fullscreen */}
            <div className="top-4 right-4 z-10 absolute flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="bg-black/30 hover:bg-black/40 backdrop-blur-sm text-white/90 hover:text-white"
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

          {/* Navigation Controls */}
          <div className="top-1/2 z-10 absolute flex justify-between px-4 w-full -translate-y-1/2">
            <Button
              aria-label="Previous image"
              variant="ghost"
              size="lg"
              className="bg-white/90 hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-900/90 shadow-xl p-3 rounded-full hover:scale-105 transition-transform"
              onClick={prevImage}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
            <Button
              aria-label="Next image"
              variant="ghost"
              size="lg"
              className="bg-white/90 hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-900/90 shadow-xl p-3 rounded-full hover:scale-105 transition-transform"
              onClick={nextImage}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </div>

          {/* Progress Indicators */}
          <div className="bottom-4 left-1/2 z-10 absolute flex items-center gap-3 bg-black/30 dark:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full -translate-x-1/2">
            <span className="font-medium text-white text-sm">
              {currentImageIndex + 1} / {media.length}
            </span>
            <div className="bg-white/30 w-px h-4" />
            <div className="flex gap-1.5">
              {media.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-blue-500 scale-125"
                      : "bg-white/50 hover:bg-white/70 scale-100"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnail Grid con stagger */}
        <motion.div
          className="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-4"
          variants={thumbnailsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {media.map((mediaItem, index) => (
            <motion.div
              key={index}
              className={`relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                index === currentImageIndex
                  ? "border-blue-500 scale-105 z-10"
                  : "border-transparent hover:border-blue-300"
              }`}
              variants={thumbnailItem}
              whileHover={{ scale: 1.05, rotateZ: 0.5 }}
              onClick={() => setCurrentImageIndex(index)}
            >
              <div className="relative bg-gray-100 dark:bg-gray-900 aspect-square">
                <img
                  src={getAssetImage(mediaItem.url)}
                  alt={mediaItem.description || `Media ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {index === currentImageIndex && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {isFullscreen && (
        <button
          className="top-6 right-6 z-50 absolute text-white/90 hover:text-white"
          onClick={toggleFullscreen}
        >
          <Minimize className="w-8 h-8" />
        </button>
      )}
    </motion.section>
  );
};

export default MediaGallery;
