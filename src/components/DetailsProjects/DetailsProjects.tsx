import { useEffect, useRef, useState } from "react";
import { X, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { getAssetImage } from "@/lib/assetImages";
import { usePortfolioContent } from "@/lib/portfolioContent";
import type { ProjectData } from "@/content/portfolio/types";

export default function DetailsProjects({ project, onClose }: { project: ProjectData; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const { language } = usePortfolioContent();
  const es = language === "es";
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);
  const image = project.media[imageIndex];
  const isVideo = image?.type === "video";
  const imageUrl = image ? (isVideo ? `${import.meta.env.BASE_URL}${image.url}` : getAssetImage(image.url)) : "";
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={event => { event.preventDefault(); onClose(); }}>
    <div className="detail-bar"><span>{es ? "Proyecto" : "Project"} / {project.client || project.role}</span><button autoFocus onClick={onClose} aria-label={es ? "Cerrar detalle" : "Close details"}><X size={22} /></button></div>
    <div className="detail-content">
      <div className="detail-intro"><div><p className="section-label">{project.role}</p><h2 id="project-dialog-title">{project.name}</h2></div><div><p>{project.quick_view?.summary || project.description}</p><div className="detail-links">{project.url && <a href={project.url} target="_blank" rel="noreferrer">{es ? "Visitar proyecto" : "Visit project"} <ArrowUpRight size={16} /></a>}{project.repository && <a href={project.repository} target="_blank" rel="noreferrer">{es ? "Ver repositorio" : "View repository"} <ArrowUpRight size={16} /></a>}</div></div></div>
      {imageUrl && <figure className="detail-figure">
        {isVideo ? <video key={image.url} controls playsInline preload="none" poster={image.poster ? getAssetImage(image.poster) : undefined} aria-label={image.description || project.name}>
          <source src={imageUrl} type="video/mp4" />
          {image.captions && <track kind="captions" src={`${import.meta.env.BASE_URL}${image.captions}`} srcLang="es" label="Español" default={es} />}
          {image.subtitles && <track kind="subtitles" src={`${import.meta.env.BASE_URL}${image.subtitles}`} srcLang="en" label="English" default={!es} />}
          <a href={imageUrl}>{es ? "Abrir video" : "Open video"}</a>
        </video> : <img src={imageUrl} alt={image.description || project.name} />}
        <figcaption><span>{image.description}</span>{project.media.length > 1 && <div className="gallery-controls"><button onClick={() => setImageIndex((imageIndex + project.media.length - 1) % project.media.length)} aria-label={es ? "Imagen anterior" : "Previous image"}><ArrowLeft size={18} /></button><span>{imageIndex + 1} / {project.media.length}</span><button onClick={() => setImageIndex((imageIndex + 1) % project.media.length)} aria-label={es ? "Imagen siguiente" : "Next image"}><ArrowRight size={18} /></button></div>}</figcaption>
      </figure>}
      <div className="detail-body"><div><p className="section-label">{es ? "El proyecto" : "The project"}</p><h3>{es ? "Contexto y contribución" : "Context & contribution"}</h3><p>{project.Project_Overview || project.description}</p>
        {project.responsibilities.length > 0 && <><h4>{es ? "Responsabilidades" : "Responsibilities"}</h4><ul>{project.responsibilities.map(item => <li key={item}>{item}</li>)}</ul></>}
        {project.achievements.length > 0 && <><h4>{es ? "Resultados" : "Outcomes"}</h4><ul>{project.achievements.map(item => <li key={item}>{item}</li>)}</ul></>}</div>
        <aside><p className="section-label">{es ? "Detalles" : "Details"}</p>{project.client && <p><strong>{es ? "Cliente" : "Client"}</strong><br />{project.client}</p>}<p><strong>{es ? "Rol" : "Role"}</strong><br />{project.role}</p>{project.start_date && <p><strong>{project.date_source === "git" ? (es ? "Actividad documentada en Git" : "Documented Git activity") : (es ? "Periodo" : "Period")}</strong><br />{project.start_date}{project.end_date ? ` — ${project.end_date}` : ""}</p>}{project.technologies && <p><strong>Stack</strong><br />{Object.values(project.technologies).flat().join(" · ")}</p>}</aside></div>
    </div>
  </dialog>;
}
