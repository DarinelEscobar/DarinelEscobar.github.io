import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface TechnicalSidebarProps {
  project: any;
}

const sidebarVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3 },
  },
};

const TechnicalSidebar: React.FC<TechnicalSidebarProps> = ({ project }) => {
  return (
    <motion.div
      className="lg:col-span-1"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="top-24 sticky bg-whi shadow-lg border border-5whi dark:border-5dar">
        <CardHeader className="pb-4">
          <CardTitle className="font-cor text-dar text-2xl">
            Technical Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-6 font-lat text-dar">
            <div className="flex items-center gap-4">
              <Building className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-5dar text-sm">Client</p>
                <p className="font-rob font-medium text-lg">{project.client}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-5dar text-sm">Duration</p>
                <p className="font-rob font-medium text-lg">
                  {new Date(project.start_date).toLocaleDateString()} - {" "}
                  {new Date(project.end_date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Users className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-5dar text-sm">Team</p>
                <p className="font-rob font-medium text-lg">
                  {project.team_size} developers
                </p>
              </div>
            </div>
          </div>

          {/* Tecnología */}
          {project.technologies && (
            <div className="space-y-4">
              <h4 className="font-cor font-semibold text-dar text-lg">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-3">
                {Object.entries(project.technologies).map(
                  ([category, techs]: [string, string[]]) => (
                    <div key={category} className="space-y-2">
                      <span className="font-lat text-5dar text-sm">
                        {category}:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {techs.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="hover:bg-blue-500/5 px-3 py-1.5 border-blue-500/20 font-rob font-medium text-dar text-sm"
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
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TechnicalSidebar;
