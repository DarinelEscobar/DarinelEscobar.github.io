import { useState } from "react";
import { ImageOff } from "lucide-react";
import type { ProjectData } from "@/content/portfolio/types";
import { getAssetImage } from "@/lib/assetImages";
import { usePresentationCopy } from "@/lib/portfolioContent";

export default function ProjectQuickPreview({ project, className = "" }: { project: ProjectData; className?: string }) {
  const [failedSource, setFailedSource] = useState("");
  const copy = usePresentationCopy();
  const media = project.media.find((item) => item.url.endsWith("/admin-dashboard.webp")) ?? project.media[0];
  const src = media?.url ? getAssetImage(media.url) : "";
  return (
    <div className={"project-preview " + className}>
      {src && failedSource !== src ? <img src={src} alt={media?.description || project.name} loading="lazy" decoding="async" width={960} height={600} onError={() => setFailedSource(src)} /> :
        <div className="preview-empty"><ImageOff size={28} className="mx-auto mb-3" aria-hidden="true" /><p>{copy.imageFailed}</p></div>}
    </div>
  );
}
