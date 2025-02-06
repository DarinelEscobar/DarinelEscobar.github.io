
import React, { useState } from "react";

import {
  ArrowUpRight,
  Calendar,
  Users,
  Building,
  ChevronLeft,
  ChevronRight,
  X, // <-- icono para cerrar
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Importa el JSON
import data from "@data/experience.json";

// Tipos de Props
interface DetailsProjectsProps {
  projectIndex: number; // índice del proyecto en el array data.experience.projects
  onClose: () => void;  // función para cerrar la ventana
}

const DetailsProjects: React.FC<DetailsProjectsProps> = ({ projectIndex, onClose }) => {
  // Obtener el proyecto a partir del índice
  const project = data.experience.projects[projectIndex];

  // Manejo del índice de imágenes
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Funciones para cambiar la imagen actual
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.media.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + project.media.length) % project.media.length
    );
  };

  // Estilos de overlay para que sea absoluto y pueda hacer scroll
  // Puedes personalizar animaciones con Framer Motion si deseas transiciones
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/70">
      {/* Contenedor principal que permite scroll */}
      <div className="relative min-h-full w-full">
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow hover:bg-white z-50"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Contenido de DetailsProjects (el diseño adaptado) */}
        <div className="min-h-screen bg-background text-foreground">
          {/*
            ===========================================
            HERO SECTION
            ===========================================
          */}
          <section className="min-h-[50vh] flex items-center bg-gradient-to-r from-primary/5 to-secondary/5 py-24 px-4">
            <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
              {/* Información principal del proyecto */}
              <div className="w-full lg:w-1/2 space-y-8">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {project.name}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  {project.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Botón principal: aquí podrías enlazar a una sección interna o página de detalle */}
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-8 py-6 text-lg"
                    onClick={() => {
                      alert("Explorando el proyecto...");
                    }}
                  >
                    Explorar Proyecto
                  </Button>

                  {/* Botón "Ver Repositorio": Abre el repositorio en una nueva pestaña */}
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto px-8 py-6 text-lg"
                    onClick={() => window.open(project.repository, "_blank")}
                  >
                    Ver Repositorio
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Imagen de "mockup" o portada del proyecto */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-border/50">
                  <img
                    src="/mockup-laptop.png"
                    alt="Project Mockup"
                    width={800}
                    height={500}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-lg font-medium">
                    Vista previa interactiva del proyecto
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/*
            ===========================================
            INFORMACIÓN DETALLADA DEL PROYECTO
            ===========================================
          */}
          <section className="py-24 px-4">
            <div className="container mx-auto grid lg:grid-cols-3 gap-12">
              {/* Contenido principal del proyecto (col-span-2 en pantallas grandes) */}
              <div className="lg:col-span-2 space-y-16">
                {/* Descripción del proyecto */}
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold">Descripción del Proyecto</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Responsabilidades */}
                <div className="space-y-12">
                  <h3 className="text-2xl font-bold">Responsabilidades</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.responsibilities.map((resp, index) => (
                      <Card
                        key={index}
                        className="hover:shadow-lg transition-shadow duration-200"
                      >
                        <CardContent className="flex items-start p-6 gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <ArrowUpRight className="h-6 w-6" />
                          </div>
                          <p className="text-lg leading-relaxed">{resp}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Logros Clave */}
                <div className="space-y-12">
                  <h3 className="text-2xl font-bold">Logros Clave</h3>
                  <div className="space-y-6">
                    {project.achievements.map((achievement, index) => (
                      <Card
                        key={index}
                        className="bg-secondary/5 hover:shadow-lg transition-shadow duration-200"
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl">
                            {`Logro ${index + 1}`}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{achievement}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Barra lateral (Detalles Técnicos) */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 border border-border/50 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl">Detalles Técnicos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Cliente, Duración, Equipo */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Building className="h-6 w-6 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Cliente</p>
                          <p className="text-lg font-medium">{project.client}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Calendar className="h-6 w-6 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Duración</p>
                          <p className="text-lg font-medium">
                            {new Date(project.start_date).toLocaleDateString()} -{" "}
                            {new Date(project.end_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Users className="h-6 w-6 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Equipo</p>
                          <p className="text-lg font-medium">
                            {project.team_size} desarrolladores
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Stack Tecnológico */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Stack Tecnológico</h4>
                      <div className="flex flex-wrap gap-3">
                        {Object.entries(project.technologies).map(([category, techs]) => (
                          <div key={category} className="space-y-2">
                            <span className="text-sm text-muted-foreground">
                              {category}:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {techs.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  className="px-3 py-1.5 text-sm font-medium border-primary/20 hover:bg-primary/5"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/*
            ===========================================
            MATERIAL MULTIMEDIA (SLIDER)
            ===========================================
          */}
          <section className="py-24 px-4 bg-secondary/5">
            <div className="container mx-auto space-y-12">
              <h2 className="text-3xl font-bold text-center">Material Multimedia</h2>

              <div className="relative group max-w-5xl mx-auto">
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-border/50 relative">
                  <img
                    src={project.media[currentImageIndex].url}
                    alt={project.media[currentImageIndex].description}
                    width={1600}
                    height={900}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 flex items-end p-6">
                    <p className="text-white text-lg font-medium">
                      {project.media[currentImageIndex].description}
                    </p>
                  </div>
                </div>

                {/* Controles del Slider (Flechas) */}
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

                {/* Indicadores (dots) */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {project.media.map((_, index) => (
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
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DetailsProjects;
