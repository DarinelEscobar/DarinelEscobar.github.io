import React from "react";
import sampleProject from "../../assets/images/Sample.png";
import { useInView } from "react-intersection-observer";

const Projects: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });

  return (
    <div
      ref={ref}
      className="flex flex-col min-h-screen w-screen bg-whi justify-center items-center py-8 lg:py-0 px-4 sm:px-6 transition-colors duration-300"
    >
      {/* Contenedor principal */}
      <div
        className="relative w-full lg:w-[90%] h-auto lg:h-[80vh]
          bg-gradient-to-r from-white via-[#ECECEC] to-[#DCDCDC]
          dark:from-[#1F1F1F] dark:via-[#2C2C2C] dark:to-[#3B3B3B]
          rounded-2xl shadow-xl overflow-hidden border-2 border-gray-300/30 dark:border-gray-600
          lg:overflow-visible backdrop-blur-sm"
      >
        {/* Versión para móvil/tablet */}
        <div className="lg:hidden flex flex-col p-6 space-y-4 text-dar dark:text-gray-100">
          <h4 className="font-lat text-xs sm:text-sm uppercase tracking-[0.2em] text-dar dark:text-gray-100">
            Featured Project
          </h4>
          <h2 className="font-cor text-2xl sm:text-3xl font-bold leading-tight">
            Example Project
          </h2>
          <p className="font-lat text-sm sm:text-base text-whi
            p-4 bg-whi5 rounded-md border-2 border-gray-300/30 dark:border-gray-600 shadow-sm">
            A web app for visualizing personalized Spotify data. View your top
            artists, top tracks, recently played tracks, and detailed audio
            information about each track.
          </p>
          <div className="flex space-x-2">
            {[..."123"].map((_, i) => (
              <span
                key={i}
                className="w-2 h-2 bg-dar/80 dark:bg-gray-300 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Versión para escritorio */}
        <div className="hidden lg:block absolute left-8 top-1/4 z-10 w-1/2 space-y-4 text-dar dark:text-gray-100 translate-y-16">
          <h4 className="font-rob text-sm uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400">
            Featured Project
          </h4>
          <h2 className="font-cor text-4xl font-bold leading-tight">
            Example Project
          </h2>
<p className="font-lat text-dar p-4 text-base bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-1 border-gray-600 shadow-sm">
            A web app for visualizing personalized Spotify data. View your top
            artists, top tracks, recently played tracks, and detailed audio
            information about each track.
          </p>
          <div className="flex space-x-2">
            {[..."123"].map((_, i) => (
              <span
                key={i}
                className="w-2 h-2 bg-gray-300 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Contenedor de imagen */}
        <div
          className="w-full lg:absolute right-0 lg:top-1/4 lg:pl-9 lg:w-[55%]
            h-[300px] sm:h-[400px] lg:h-[60%] bg-whi5
            rounded-2xl overflow-hidden mt-6 lg:mt-0 border-2 border-whi5 "
        >
          <img
            src={sampleProject}
            alt="Project"
            className="w-full h-full object-cover rounded-xl lg:translate-y-9
              border-b-4 border-gray-200/30 dark:border-gray-600 transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
