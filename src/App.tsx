import React, { useState } from "react";
import Agree from "./agree/Agree";
import Countdown from "./countdown/Count";

function App() {
  const [showTimer, setShowTimer] = useState(false);

  const changeShowTimer = () => {
    setShowTimer(true);
  };

  return !showTimer ? <Agree onAgree={changeShowTimer} /> : <Countdown />;
}

export default App;
