import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { ChevronLeft, ChevronRight, Expand, X, ImageOff } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import { getAssetImage } from "@/lib/assetImages";
import { usePresentationCopy, useUiCopy } from "@/lib/portfolioContent";
import useModalDialog from "@/hooks/useModalDialog";

interface MediaItem { url: string; description?: string }
interface MediaGalleryProps {
  media: MediaItem[];
  currentImageIndex: number;
  setCurrentImageIndex: Dispatch<SetStateAction<number>>;
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  const copy = usePresentationCopy();
  if (failed || !src) return <div className="preview-empty" role="status"><ImageOff className="mx-auto mb-3" /><p>{copy.imageFailed}</p></div>;
  return <img src={src} alt={alt} decoding="async" onError={() => setFailed(true)} />;
}

function FullImage({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const copy = usePresentationCopy();
  useModalDialog(ref);
  return (
    <dialog ref={ref} className="image-dialog" aria-label={alt} onCancel={(event) => { event.preventDefault(); event.stopPropagation(); onClose(); }}>
      <button type="button" className="icon-button" aria-label={copy.collapse} onClick={onClose}><X /></button>
      <GalleryImage key={src} src={src} alt={alt} />
    </dialog>
  );
}

export default function MediaGallery({ media, currentImageIndex, setCurrentImageIndex }: MediaGalleryProps) {
  const { projects } = useUiCopy();
  const copy = usePresentationCopy();
  const [fullscreen, setFullscreen] = useState(false);
  const changeImage = (direction: number) => setCurrentImageIndex((current) => (current + direction + media.length) % media.length);
  const handlers = useSwipeable({ onSwipedLeft: () => changeImage(1), onSwipedRight: () => changeImage(-1), delta: 50 });
  const item = media[currentImageIndex];
  if (!item) return null;
  const src = getAssetImage(item.url);
  const alt = item.description || copy.image + " " + (currentImageIndex + 1);
  return (
    <section className="media-gallery" aria-labelledby="gallery-title" onKeyDown={(event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        changeImage(event.key === "ArrowRight" ? 1 : -1);
      }
    }}>
      <h3 id="gallery-title">{copy.media}</h3>
      <div className="media-stage" {...handlers}>
        <GalleryImage key={src} src={src} alt={alt} />
        <button type="button" className="icon-button media-expand" aria-label={copy.expand} onClick={() => setFullscreen(true)}><Expand size={20} /></button>
      </div>
      <div className="gallery-controls">
        <p role="status">{copy.image} {currentImageIndex + 1} / {media.length}</p>
        {media.length > 1 && <div>
          <button type="button" className="icon-button" aria-label={projects.previousImageLabel} onClick={() => changeImage(-1)}><ChevronLeft /></button>
          <button type="button" className="icon-button" aria-label={projects.nextImageLabel} onClick={() => changeImage(1)}><ChevronRight /></button>
        </div>}
      </div>
      {item.description && <p className="gallery-caption">{item.description}</p>}
      {media.length > 1 && <div className="gallery-thumbnails">
        {media.map((image, index) => (
          <button type="button" key={image.url} aria-label={copy.image + " " + (index + 1)} aria-pressed={currentImageIndex === index} onClick={() => setCurrentImageIndex(index)}>
            <img src={getAssetImage(image.url)} alt="" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>}
      {fullscreen && <FullImage src={src} alt={alt} onClose={() => setFullscreen(false)} />}
    </section>
  );
}
