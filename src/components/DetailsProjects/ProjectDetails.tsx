

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

interface ProjectDetailsProps {
  project: any;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <div className="lg:col-span-2 space-y-16">
      {/* Descripción del proyecto */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold">Project Description</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Responsabilidades */}
      <div className="space-y-12">
        <h3 className="text-2xl font-bold">Responsibilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.responsibilities.map((resp: string, index: number) => (
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

      {/* Logros clave */}
      <div className="space-y-12">
        <h3 className="text-2xl font-bold">Key Achievements</h3>
        <div className="space-y-6">
          {project.achievements.map((achievement: string, index: number) => (
            <Card
              key={index}
              className="bg-secondary/5 hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">
                  {`Achievement ${index + 1}`}
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
  );
};

export default ProjectDetails;
