import React, { useState } from "react";
import {
  CarFront,
  ClipboardList,
  FolderKanban,
  GraduationCap,
  LayoutTemplate,
  MonitorSmartphone,
  Plane,
  Sparkles,
  Ticket,
  Wallet,
} from "lucide-react";
import type { ProjectData } from "@/content/portfolio/types";
import { getAssetImage } from "@/lib/assetImages";
import { cn } from "@/lib/utils";

interface ProjectQuickPreviewProps {
  project: ProjectData;
  className?: string;
}

const shellClassName =
  "relative overflow-hidden rounded-[1.25rem] border border-black/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(241,237,230,0.92))] p-3 shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(32,31,28,0.96),rgba(18,18,18,0.92))] dark:shadow-[0_18px_44px_rgba(0,0,0,0.32)]";

const blockClassName =
  "rounded-lg border border-black/10 bg-white/65 dark:border-white/10 dark:bg-white/[0.05]";

const lineClassName = "rounded-full border border-black/10 dark:border-white/10";

function PreviewChrome({ children, icon: Icon }: { children: React.ReactNode; icon: React.ElementType }) {
  return (
    <div className={cn(shellClassName, "h-full min-h-[132px]")}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.12),transparent_36%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_34%)]" />

      <div className="relative flex h-full flex-col">
        <div className="mb-3 flex items-center justify-between">
          <div className="inline-flex items-center rounded-full border border-black/10 bg-white/60 p-1.5 text-5dar dark:border-white/10 dark:bg-white/[0.06] dark:text-5whi">
            <Icon className="h-3.5 w-3.5" />
          </div>

          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-black/15 dark:bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-black/10 dark:bg-white/10" />
            <span className="h-2 w-2 rounded-full bg-black/10 dark:bg-white/10" />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

function PortfolioPreview() {
  return (
    <PreviewChrome icon={MonitorSmartphone}>
      <div className="grid flex-1 grid-cols-[1.25fr_0.85fr] gap-2">
        <div className={cn(blockClassName, "space-y-2 p-3")}>
          <div className={cn(lineClassName, "h-4 w-2/3")} />
          <div className={cn(lineClassName, "h-9")} />
          <div className="grid grid-cols-3 gap-2">
            <div className={cn(blockClassName, "h-8")} />
            <div className={cn(blockClassName, "h-8")} />
            <div className={cn(blockClassName, "h-8")} />
          </div>
        </div>
        <div className="grid gap-2">
          <div className={cn(blockClassName, "h-1/2")} />
          <div className={cn(blockClassName, "grid grid-cols-2 gap-2 p-2")}>
            <div className={cn(blockClassName, "h-full")} />
            <div className={cn(blockClassName, "h-full")} />
          </div>
        </div>
      </div>
    </PreviewChrome>
  );
}

function ExtensionPreview() {
  return (
    <PreviewChrome icon={Sparkles}>
      <div className="grid flex-1 grid-cols-[72px_1fr] gap-2">
        <div className={cn(blockClassName, "space-y-2 p-2.5")}>
          <div className={cn(lineClassName, "h-3 w-full")} />
          <div className={cn(lineClassName, "h-3 w-5/6")} />
          <div className={cn(lineClassName, "h-3 w-2/3")} />
        </div>
        <div className={cn(blockClassName, "space-y-2 p-3")}>
          <div className={cn(lineClassName, "h-4 w-1/2")} />
          <div className={cn(blockClassName, "h-10")} />
          <div className="grid grid-cols-2 gap-2">
            <div className={cn(blockClassName, "h-9")} />
            <div className={cn(blockClassName, "h-9")} />
          </div>
        </div>
      </div>
    </PreviewChrome>
  );
}

function TicketingPreview() {
  return (
    <PreviewChrome icon={Ticket}>
      <div className="grid flex-1 grid-cols-[1fr_84px] gap-2">
        <div className="space-y-2">
          <div className={cn(blockClassName, "h-8")} />
          <div className="grid grid-cols-3 gap-2">
            <div className={cn(blockClassName, "h-8")} />
            <div className={cn(blockClassName, "h-8")} />
            <div className={cn(blockClassName, "h-8")} />
          </div>
        </div>
        <div className={cn(blockClassName, "grid grid-cols-4 gap-1.5 p-2")}>
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className={cn(blockClassName, "h-3 rounded-sm")} />
          ))}
        </div>
      </div>
    </PreviewChrome>
  );
}

function PaymentsPreview() {
  return (
    <PreviewChrome icon={Wallet}>
      <div className="grid flex-1 grid-cols-[1fr_88px] gap-2">
        <div className={cn(blockClassName, "space-y-2 p-2.5")}>
          <div className={cn(blockClassName, "h-7")} />
          <div className={cn(blockClassName, "h-7")} />
          <div className={cn(blockClassName, "h-7")} />
        </div>
        <div className={cn(blockClassName, "grid grid-cols-4 gap-1 p-2.5")}>
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className={cn(blockClassName, "aspect-square rounded-md")} />
          ))}
        </div>
      </div>
    </PreviewChrome>
  );
}

function EducationPreview() {
  return (
    <PreviewChrome icon={GraduationCap}>
      <div className="grid flex-1 grid-cols-[84px_1fr] gap-2">
        <div className={cn(blockClassName, "space-y-2 p-2")}>
          <div className={cn(blockClassName, "h-7")} />
          <div className={cn(blockClassName, "h-7")} />
          <div className={cn(blockClassName, "h-7")} />
        </div>
        <div className="space-y-2">
          <div className={cn(blockClassName, "h-8")} />
          <div className="grid grid-cols-2 gap-2">
            <div className={cn(blockClassName, "h-14")} />
            <div className={cn(blockClassName, "h-14")} />
          </div>
        </div>
      </div>
    </PreviewChrome>
  );
}

function AdminPreview() {
  return (
    <PreviewChrome icon={FolderKanban}>
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-2">
          <div className={cn(blockClassName, "h-10")} />
          <div className={cn(blockClassName, "h-10")} />
          <div className={cn(blockClassName, "h-10")} />
        </div>
        <div className="grid flex-1 grid-cols-[1fr_88px] gap-2">
          <div className={cn(blockClassName, "flex items-end gap-2 p-3")}>
            <div className={cn(blockClassName, "h-7 w-4 rounded-sm")} />
            <div className={cn(blockClassName, "h-11 w-4 rounded-sm")} />
            <div className={cn(blockClassName, "h-9 w-4 rounded-sm")} />
            <div className={cn(blockClassName, "h-14 w-4 rounded-sm")} />
          </div>
          <div className={cn(blockClassName, "space-y-2 p-2")}>
            <div className={cn(blockClassName, "h-6")} />
            <div className={cn(blockClassName, "h-6")} />
            <div className={cn(blockClassName, "h-6")} />
          </div>
        </div>
      </div>
    </PreviewChrome>
  );
}

function LandingPreview() {
  return (
    <PreviewChrome icon={LayoutTemplate}>
      <div className={cn(blockClassName, "space-y-2 p-3")}>
        <div className={cn(lineClassName, "h-4 w-2/3")} />
        <div className={cn(lineClassName, "h-3 w-1/2")} />
        <div className="grid grid-cols-3 gap-2">
          <div className={cn(blockClassName, "h-10")} />
          <div className={cn(blockClassName, "h-10")} />
          <div className={cn(blockClassName, "h-10")} />
        </div>
      </div>
    </PreviewChrome>
  );
}

function OperationsPreview() {
  return (
    <PreviewChrome icon={ClipboardList}>
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-2">
          <div className={cn(blockClassName, "h-10")} />
          <div className={cn(blockClassName, "h-10")} />
          <div className={cn(blockClassName, "h-10")} />
        </div>
        <div className="grid grid-cols-[1fr_96px] gap-2">
          <div className={cn(blockClassName, "space-y-2 p-2.5")}>
            <div className={cn(lineClassName, "h-3 w-1/2")} />
            <div className={cn(blockClassName, "h-7")} />
            <div className={cn(blockClassName, "h-7")} />
          </div>
          <div className={cn(blockClassName, "space-y-2 p-2.5")}>
            <div className={cn(blockClassName, "h-6")} />
            <div className={cn(blockClassName, "h-6")} />
            <div className={cn(blockClassName, "h-6")} />
          </div>
        </div>
      </div>
    </PreviewChrome>
  );
}

function AviationPreview() {
  return (
    <PreviewChrome icon={Plane}>
      <div className="grid flex-1 grid-cols-[1fr_88px] gap-2">
        <div className={cn(blockClassName, "space-y-2 p-3")}>
          <div className={cn(lineClassName, "h-3 w-2/3")} />
          <div className={cn(blockClassName, "h-8")} />
          <div className={cn(blockClassName, "h-8")} />
          <div className={cn(blockClassName, "h-8")} />
        </div>
        <div className={cn(blockClassName, "grid gap-2 p-2.5")}>
          <div className={cn(blockClassName, "h-12")} />
          <div className={cn(blockClassName, "h-12")} />
        </div>
      </div>
    </PreviewChrome>
  );
}

function AutomotivePreview() {
  return (
    <PreviewChrome icon={CarFront}>
      <div className="grid flex-1 grid-cols-[1fr_98px] gap-2">
        <div className={cn(blockClassName, "space-y-2 p-3")}>
          <div className={cn(lineClassName, "h-3 w-1/2")} />
          <div className="grid grid-cols-2 gap-2">
            <div className={cn(blockClassName, "h-12")} />
            <div className={cn(blockClassName, "h-12")} />
          </div>
          <div className={cn(blockClassName, "h-8")} />
        </div>
        <div className={cn(blockClassName, "space-y-2 p-2")}>
          <div className={cn(blockClassName, "h-7")} />
          <div className={cn(blockClassName, "h-7")} />
          <div className={cn(blockClassName, "h-7")} />
        </div>
      </div>
    </PreviewChrome>
  );
}

function GenericPreview() {
  return (
    <PreviewChrome icon={FolderKanban}>
      <div className="grid flex-1 grid-cols-2 gap-2">
        <div className={cn(blockClassName, "space-y-2 p-3")}>
          <div className={cn(lineClassName, "h-3 w-1/2")} />
          <div className={cn(blockClassName, "h-9")} />
          <div className={cn(blockClassName, "h-9")} />
        </div>
        <div className={cn(blockClassName, "space-y-2 p-3")}>
          <div className={cn(blockClassName, "h-12")} />
          <div className={cn(blockClassName, "h-8")} />
        </div>
      </div>
    </PreviewChrome>
  );
}

function getVariantPreview(variant?: string) {
  switch (variant) {
    case "portfolio":
      return <PortfolioPreview />;
    case "extension":
      return <ExtensionPreview />;
    case "ticketing":
      return <TicketingPreview />;
    case "payments":
      return <PaymentsPreview />;
    case "education":
      return <EducationPreview />;
    case "admin":
      return <AdminPreview />;
    case "landing":
      return <LandingPreview />;
    case "operations":
      return <OperationsPreview />;
    case "aviation":
      return <AviationPreview />;
    case "automotive":
      return <AutomotivePreview />;
    default:
      return <GenericPreview />;
  }
}

const ProjectQuickPreview: React.FC<ProjectQuickPreviewProps> = ({ project, className }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const firstMedia = project.media[0];
  const previewVariant = project.quick_view?.preview_variant;
  const imageSource = firstMedia?.url ? getAssetImage(firstMedia.url) : "";

  if (imageSource && !imageFailed) {
    return (
      <div className={cn(shellClassName, "h-full min-h-[132px]", className)}>
        <img
          src={imageSource}
          alt={firstMedia?.description ?? project.name}
          className="h-full min-h-[132px] w-full rounded-[0.9rem] object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      </div>
    );
  }

  return <div className={cn("h-full", className)}>{getVariantPreview(previewVariant)}</div>;
};

export default ProjectQuickPreview;
