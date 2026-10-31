import Header from "@/components/Header/Header";
import MainContent from "./MainContent";
import Projects from "@/components/Projects/Projects";
import Skills from "./Skills";
import ContactMe from "@/components/ContactMe/ContactMe";

export default function HomePage() {
  return <main id="main-container" className="portfolio-page">
    <Header />
    <MainContent />
    <div id="work"><Projects layoutMode="section" /></div>
    <Skills />
    <ContactMe />
  </main>;
}
