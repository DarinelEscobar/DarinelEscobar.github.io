import MainContent from "./MainContent";
import AboutMe from "./AboutMe";
import Skills from "./Skills";
import Projects from "@/components/Projects/Projects";
import ContactMe from "@/components/ContactMe/ContactMe";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <MainContent />
      <Projects layoutMode="section" />
      <AboutMe />
      <Skills />
      <ContactMe />
    </main>
  );
}
