import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Minimize,
  Loader2,
} from "lucide-react";
import { useAssetImage } from "./utils";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useHotkeys } from "react-hotkeys-hook";
import { usePortfolioContent } from "@/lib/portfolioContent";
import { smoothTransition } from "@/lib/motionPresets";

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
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
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
  hidden: { y: 12, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: smoothTransition,
  },
};

interface GalleryThumbnailProps {
  mediaItem: MediaItem;
  index: number;
  isSelected: boolean;
  label: string;
  reduceMotion: boolean | null;
  onSelect: (index: number) => void;
}

function GalleryThumbnail({
  mediaItem,
  index,
  isSelected,
  label,
  reduceMotion,
  onSelect,
}: GalleryThumbnailProps) {
  const { src, isLoading, hasError } = useAssetImage(mediaItem.url);

  return (
    <motion.button
      type="button"
      className={`relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300 ${
        isSelected
          ? "z-10 scale-105 border-[rgb(var(--cobalt))]"
          : "border-transparent hover:border-[rgba(var(--cobalt),0.45)]"
      }`}
      variants={thumbnailItem}
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
      onClick={() => onSelect(index)}
      aria-label={`${label} ${index + 1}`}
      aria-pressed={isSelected}
    >
      <span className="relative block aspect-square bg-gray-100 dark:bg-gray-900">
        {src && !hasError ? (
          <img
            src={src}
            alt={mediaItem.description || `${label} ${index + 1}`}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span
            className="absolute inset-0 block animate-pulse bg-dar/[0.06] dark:bg-white/[0.08]"
            aria-hidden="true"
          />
        )}
        {isLoading ? (
          <span
            className="absolute inset-0 flex items-center justify-center text-[rgb(var(--cobalt))]"
            aria-hidden="true"
          >
            <Loader2 className="h-5 w-5 animate-spin" />
          </span>
        ) : null}
        {isSelected && <span className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />}
      </span>
    </motion.button>
  );
}

const MediaGallery: React.FC<MediaGalleryProps> = ({
  media,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  const {
    ui: { projects },
  } = usePortfolioContent();
  const reduceMotion = useReducedMotion();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const currentMedia = media[currentImageIndex];
  const {
    src: currentImageSrc,
    isLoading: isCurrentImageLoading,
    hasError: hasCurrentImageError,
  } = useAssetImage(currentMedia?.url);

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
    setCurrentImageIndex((currentImageIndex + 1) % media.length);
  }, [currentImageIndex, media.length, setCurrentImageIndex]);

  const prevImage = useCallback(() => {
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
    if (!isFullscreen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isFullscreen]);

  useEffect(() => {
    if (!currentImageSrc) {
      setImageDimensions(null);
      return undefined;
    }

    let isCurrent = true;
    const img = new Image();
    img.src = currentImageSrc;
    img.onload = () => {
      if (isCurrent) {
        setImageDimensions({ width: img.width, height: img.height });
      }
    };
    img.onerror = () => {
      if (isCurrent) {
        setImageDimensions(null);
      }
    };

    return () => {
      isCurrent = false;
    };
  }, [currentImageSrc]);

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
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
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
                initial={reduceMotion ? false : { opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="relative flex h-full w-full items-center justify-center"
              >
                {isCurrentImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                    <Loader2 className="h-12 w-12 animate-spin text-[rgb(var(--cobalt))]" />
                  </div>
                )}

                {currentImageSrc && !hasCurrentImageError ? (
                  <img
                    src={currentImageSrc}
                    alt={currentMedia.description || projects.multimediaMaterialLabel}
                    {...(currentMedia.url.includes("fav-400.webp")
                      ? {
                          width: 383,
                          height: 295,
                        }
                      : {})}
                    loading="lazy"
                    decoding="async"
                    className={`transition-opacity duration-300 ${
                      isCurrentImageLoading ? "opacity-0" : "opacity-100"
                    }`}
                    style={{
                      ...calculateImagePosition(),
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <div className="flex min-h-[320px] w-full items-center justify-center bg-gray-100 px-6 text-center text-sm text-dar/62 dark:bg-gray-900 dark:text-white/68">
                    {isCurrentImageLoading ? projects.multimediaMaterialLabel : projects.noImageAvailableLabel}
                  </div>
                )}

                <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-6 pb-4 pt-16">
                  <p className="text-lg font-medium text-white/90 drop-shadow-lg">
                    {currentMedia.description}
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
                aria-label={isFullscreen ? projects.exitFullscreenLabel : projects.enterFullscreenLabel}
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
                  type="button"
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`${projects.selectMediaLabel} ${index + 1}`}
                  aria-pressed={index === currentImageIndex}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "scale-125 bg-[rgb(var(--cobalt))]"
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
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {media.map((mediaItem, index) => (
            <GalleryThumbnail
              key={`${mediaItem.url}-${index}`}
              mediaItem={mediaItem}
              index={index}
              isSelected={index === currentImageIndex}
              label={projects.selectMediaLabel}
              reduceMotion={reduceMotion}
              onSelect={setCurrentImageIndex}
            />
          ))}
        </motion.div>
      </div>

      {isFullscreen && (
        <button
          className="absolute right-6 top-6 z-50 text-white/90 hover:text-white"
          onClick={toggleFullscreen}
          aria-label={projects.exitFullscreenLabel}
          type="button"
        >
          <Minimize className="h-8 w-8" />
        </button>
      )}
    </motion.section>
  );
};

export default MediaGallery;
