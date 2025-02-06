

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TechnicalSidebarProps {
  project: any;
}

const TechnicalSidebar: React.FC<TechnicalSidebarProps> = ({ project }) => {
  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-24 border border-border/50 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl">Technical Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Building className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Client</p>
                <p className="text-lg font-medium">{project.client}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-lg font-medium">
                  {new Date(project.start_date).toLocaleDateString()} -{" "}
                  {new Date(project.end_date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Users className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Team</p>
                <p className="text-lg font-medium">
                  {project.team_size} developers
                </p>
              </div>
            </div>
          </div>

          {/* Tecnología */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Technology Stack</h4>
            <div className="flex flex-wrap gap-3">
              {Object.entries(project.technologies).map(
                ([category, techs]: [string, string[]]) => (
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
                )
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalSidebar;
