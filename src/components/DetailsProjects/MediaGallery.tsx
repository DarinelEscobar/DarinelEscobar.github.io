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
import { usePortfolioContent } from "@/lib/portfolioContent";

interface MediaItem {
  url: string;
  description?: string;
}

interface MediaGalleryProps {
  media: MediaItem[];
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
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

const thumbnailsContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

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
  const {
    ui: { projects },
  } = usePortfolioContent();
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
    document.body.style.overflow = isFullscreen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

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
    setIsFullscreen((currentValue) => !currentValue);
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
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
          {projects.multimediaMaterialLabel}
        </h2>

        <div className="group relative mx-auto max-w-6xl" {...handlers}>
          <div
            ref={setContainerRef}
            className={`relative flex items-center justify-center overflow-hidden rounded-xl border border-gray-300 bg-gray-100 shadow-xl dark:border-gray-600/50 dark:bg-gray-900 ${
              isFullscreen ? "h-[90vh] w-[95vw]" : "max-h-[80vh]"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative flex h-full w-full items-center justify-center"
              >
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                  </div>
                )}

                <img
                  src={getAssetImage(media[currentImageIndex].url)}
                  alt={media[currentImageIndex].description || projects.multimediaMaterialLabel}
                  {...(media[currentImageIndex].url.includes("fav-400.webp")
                    ? {
                        width: 383,
                        height: 295,
                        loading: "lazy",
                        decoding: "async",
                      }
                    : {})}
                  className={`transition-opacity duration-300 ${
                    isLoading ? "opacity-0" : "opacity-100"
                  }`}
                  style={{
                    ...calculateImagePosition(),
                    objectFit: "contain",
                  }}
                />

                <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-6 pb-4 pt-16">
                  <p className="text-lg font-medium text-white/90 drop-shadow-lg">
                    {media[currentImageIndex].description}
                  </p>
                  {imageDimensions && (
                    <p className="mt-1 text-sm text-white/60">
                      {imageDimensions.width}x{imageDimensions.height}px
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute right-4 top-4 z-10 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="bg-black/30 text-white/90 backdrop-blur-sm hover:bg-black/40 hover:text-white"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize className="h-5 w-5" />
                ) : (
                  <Expand className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          <div className="absolute top-1/2 z-10 flex w-full -translate-y-1/2 justify-between px-4">
            <Button
              aria-label={projects.previousImageLabel}
              variant="ghost"
              size="lg"
              className="rounded-full bg-white/90 p-3 text-dar shadow-xl shadow-black/[0.15] transition-transform hover:scale-105 hover:bg-white dark:bg-gray-900/90 dark:shadow-black/50 dark:hover:bg-gray-900"
              onClick={prevImage}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              aria-label={projects.nextImageLabel}
              variant="ghost"
              size="lg"
              className="rounded-full bg-white/90 p-3 text-dar shadow-xl shadow-black/[0.15] transition-transform hover:scale-105 hover:bg-white dark:bg-gray-900/90 dark:shadow-black/50 dark:hover:bg-gray-900"
              onClick={nextImage}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full bg-black/30 px-4 py-2 backdrop-blur-sm dark:bg-white/20">
            <span className="text-sm font-medium text-white">
              {currentImageIndex + 1} / {media.length}
            </span>
            <div className="h-4 w-px bg-white/30" />
            <div className="flex gap-1.5">
              {media.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "scale-125 bg-blue-500"
                      : "scale-100 bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
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
                  ? "z-10 scale-105 border-blue-500"
                  : "border-transparent hover:border-blue-300"
              }`}
              variants={thumbnailItem}
              whileHover={{ scale: 1.05, rotateZ: 0.5 }}
              onClick={() => setCurrentImageIndex(index)}
            >
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-900">
                <img
                  src={getAssetImage(mediaItem.url)}
                  alt={mediaItem.description || `${projects.multimediaMaterialLabel} ${index + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
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
          className="absolute right-6 top-6 z-50 text-white/90 hover:text-white"
          onClick={toggleFullscreen}
        >
          <Minimize className="h-8 w-8" />
        </button>
      )}
    </motion.section>
  );
};

export default MediaGallery;
