

import { Link } from "react-router-dom";

function Page2() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-4">Hello World Page 2</h1>
      <Link to="/" className="text-blue-500 underline">
        Go back to Home
      </Link>
    </main>
  );
}

export default Page2;
