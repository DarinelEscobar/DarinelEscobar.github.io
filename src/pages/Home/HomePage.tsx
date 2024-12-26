import CountBtn from "@/components/ui/count-btn";
import ReactSVG from "@/assets/images/react.svg";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-y-4">
        <div className="inline-flex items-center gap-x-4">
          <img src={ReactSVG} alt="React Logo" className="w-32" />
          <span className="text-6xl">+</span>
          <img src={"/vite.svg"} alt="Vite Logo" className="w-32" />
        </div>
        <a
          href="https://github.com/shadcn/ui"
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          <Badge variant="outline">shadcn/ui</Badge>
        </a>
        <CountBtn />
        <Link to="/page2" className="text-blue-500 underline">
          Go to Page 2
        </Link>
      </div>
    </main>
  );
}

export default HomePage;
