import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { usePresentationCopy } from "@/lib/portfolioContent";
import Routes from "./container/Routes";

function App() {
  const copy = usePresentationCopy();
  return (
    <>
      <a className="skip-link" href="#main-content" onClick={(event) => {
        event.preventDefault();
        document.getElementById("main-content")?.focus();
      }}>{copy.skip}</a>
      <Header />
      <Routes />
      <Footer />
    </>
  );
}
export default App;
