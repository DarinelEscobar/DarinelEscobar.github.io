import img from "../../assets/images/me.png";

function HomePage() {
  return (
    <main className="relative bg-dark text-white h-screen overflow-y-scroll scroll-smooth">
      {/* Header */}
      <header className="sticky top-0 left-0 w-full p-8 flex justify-between text-sm bg-dark z-10">
        <div>
          <h1 className="font-rob font-bold text-lg text-[50-white]">Darinel Escobar:</h1>
          <p className="font-lat text-base text-white">Software Engineering</p>
        </div>
        <div className="text-center">
          <h1 className="font-rob font-bold text-lg text-[50-white]">Location:</h1>
          <p className="font-lat text-base text-white">Chiapas, Mexico (9:00PM)</p>
        </div>
        <div className="text-right">
          <h1 className="font-rob font-bold text-lg text-[50-white]">Navigation:</h1>
          <p className="font-lat text-base text-white">Index, Projects, Archive, Contact</p>
        </div>
        <div className="text-right">
          <h1 className="font-rob font-bold text-lg text-[50-white]">Theme:</h1>
          <p className="font-lat text-base text-white">Light Mode, Dark Mode</p>
        </div>
      </header>

      {/* Main Content */}
      <section className="flex flex-col items-center justify-center h-screen">
        <img
          src={img}
          alt="Darinel Escobar"
          className="w-[240px] h-[300px] object-cover mb-12 border-4 border-white"
        />
        <h1 className="text-[12rem] text-white font-serif">Darinel Escobar</h1>
      </section>

      {/* About Me Section */}
      <section className="flex items-center justify-center h-screen bg-dark text-white">
        <div className="text-center max-w-screen-md">
          <p className="cor text-[3rem] leading-relaxed">
            Hi, I’m Christian Darinel Escobar, a versatile software engineer specializing in full-stack development, cloud computing, and user-centric design. Welcome to my professional portfolio.
          </p>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
