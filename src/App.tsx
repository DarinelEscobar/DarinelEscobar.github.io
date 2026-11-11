

import Routes from "./container/Routes";
import { MotionConfig } from "framer-motion";

function App() {
  return <MotionConfig reducedMotion="user"><Routes /></MotionConfig>;
}

export default App;
