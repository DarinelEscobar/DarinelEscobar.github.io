import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, Minimize, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAssetImage } from "./utils";
import { useHotkeys } from "react-hotkeys-hook";
import { useSwipeable } from "react-swipeable";
import { usePortfolioContent } from "@/lib/portfolioContent";
import type { ProjectMedia } from "@/content/portfolio/types";

interface MediaGalleryProps {
  media: ProjectMedia[];
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ media, currentImageIndex, setCurrentImageIndex }) => {
  const { ui: { projects }, language } = usePortfolioContent();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const expandRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const currentMedia = media[currentImageIndex];
  const nextImage = useCallback(() => setCurrentImageIndex((index) => (index + 1) % media.length), [media.length, setCurrentImageIndex]);
  const prevImage = useCallback(() => setCurrentImageIndex((index) => (index - 1 + media.length) % media.length), [media.length, setCurrentImageIndex]);
  const handlers = useSwipeable({ onSwipedLeft: nextImage, onSwipedRight: prevImage, delta: 50 });
  useHotkeys("left", prevImage);
  useHotkeys("right", nextImage);

  useEffect(() => { setIsZoomed(false); }, [currentImageIndex]);
  useEffect(() => {
    if (!isFullscreen) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        setIsFullscreen(false);
        setIsZoomed(false);
        expandRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [isFullscreen]);

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setIsZoomed(false);
    expandRef.current?.focus();
  };

  const mediaContent = (fullscreen: boolean) => (
    <div tabIndex={fullscreen && isZoomed ? 0 : undefined}
      className={fullscreen ? "flex min-h-0 flex-1 overflow-auto rounded-lg bg-gray-100 dark:bg-gray-900" : "flex h-[min(60vh,34rem)] items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900"}>
      {currentMedia?.type === "video" ? (
        <video key={currentMedia.url} controls playsInline preload="none"
          poster={currentMedia.poster ? getAssetImage(currentMedia.poster) : undefined}
          aria-label={currentMedia.description || projects.multimediaMaterialLabel}
          className="m-auto max-h-full max-w-full object-contain">
          <source src={`${import.meta.env.BASE_URL}${currentMedia.url}`} type="video/mp4" />
          {currentMedia.captions && <track kind="captions" src={`${import.meta.env.BASE_URL}${currentMedia.captions}`} srcLang="es" label="Español" default={language === "es"} />}
          {currentMedia.subtitles && <track kind="subtitles" src={`${import.meta.env.BASE_URL}${currentMedia.subtitles}`} srcLang="en" label="English" default={language === "en"} />}
          <a href={`${import.meta.env.BASE_URL}${currentMedia.url}`}>{language === "es" ? "Abrir video" : "Open video"}</a>
        </video>
      ) : currentMedia && (
        <img src={getAssetImage(currentMedia.url)}
          alt={currentMedia.description || projects.multimediaMaterialLabel}
          className={fullscreen && isZoomed ? "m-auto h-auto w-auto max-w-none" : "m-auto h-full w-full object-contain"}
          style={fullscreen && isZoomed ? { height: "200%", minHeight: "200%" } : undefined}
        />
      )}
    </div>
  );

  const navigation = (
    <div className="flex items-center justify-center gap-4">
      <Button type="button" variant="outline" size="sm" className="bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900" aria-label={projects.previousImageLabel} onClick={prevImage}><ChevronLeft className="h-5 w-5" /></Button>
      <span className="min-w-12 text-center text-sm font-medium">{currentImageIndex + 1} / {media.length}</span>
      <Button type="button" variant="outline" size="sm" className="bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900" aria-label={projects.nextImageLabel} onClick={nextImage}><ChevronRight className="h-5 w-5" /></Button>
    </div>
  );

  return (
    <section className="container relative mx-auto px-4 pb-20">
      <h2 className="mb-8 text-center font-cor text-3xl font-bold text-dar">{projects.multimediaMaterialLabel}</h2>
      <div className="mx-auto max-w-6xl rounded-xl border border-black/10 bg-white/50 p-3 shadow-lg dark:border-white/10 dark:bg-white/5 sm:p-4">
        <div {...handlers}>{isFullscreen ? <div className="h-[min(60vh,34rem)]" /> : mediaContent(false)}</div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="min-w-0 flex-1 text-sm leading-relaxed text-dar">{currentMedia?.description}</p>
          {navigation}
          <Button ref={expandRef} type="button" variant="outline" size="sm" className="bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900"
            aria-label={language === "es" ? "Ampliar contenido" : "Expand media"}
            onClick={() => setIsFullscreen(true)}><Expand className="h-5 w-5" /></Button>
        </div>
      </div>
      <div className="mx-auto mt-5 grid max-w-6xl grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {media.map((item, index) => (
          <button key={index} type="button" aria-pressed={index === currentImageIndex}
            aria-label={item.description || `${projects.multimediaMaterialLabel} ${index + 1}`}
            onClick={() => setCurrentImageIndex(index)}
            className={`aspect-[4/3] overflow-hidden rounded-lg border-2 bg-gray-100 transition-colors dark:bg-gray-900 ${index === currentImageIndex ? "border-blue-500" : "border-transparent hover:border-blue-300"}`}>
            {item.type === "video" && !item.poster ? <span>Video</span> :
              <img src={getAssetImage(item.type === "video" ? item.poster! : item.url)} alt="" loading="lazy" className="h-full w-full object-contain" />}
          </button>
        ))}
      </div>
      {isFullscreen && (
        <div ref={fullscreenRef} role="dialog" aria-modal="true" aria-label={projects.multimediaMaterialLabel}
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const controls = fullscreenRef.current?.querySelectorAll<HTMLElement>("button, video[controls], [tabindex='0']");
            if (!controls?.length) return;
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
          }}
          className="fixed inset-0 z-[100] flex flex-col gap-3 bg-black/95 p-3 text-white sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 truncate text-sm">{currentMedia?.description}</p>
            <div className="flex shrink-0 gap-2">
              {currentMedia?.type !== "video" && <Button type="button" variant="outline" size="sm" className="bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900" aria-label={isZoomed ? (language === "es" ? "Reducir imagen" : "Zoom out") : (language === "es" ? "Acercar imagen" : "Zoom in")} aria-pressed={isZoomed} onClick={() => setIsZoomed(!isZoomed)}>{isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}</Button>}
              <Button ref={closeRef} type="button" variant="outline" size="sm" className="bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900" aria-label={language === "es" ? "Cerrar vista ampliada" : "Close expanded view"} onClick={closeFullscreen}><Minimize className="h-5 w-5" /></Button>
            </div>
          </div>
          {mediaContent(true)}
          {navigation}
        </div>
      )}
    </section>
  );
};

export default MediaGallery;
