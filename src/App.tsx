import React, { useState } from "react";
import Agree from "./agree/Agree";

function App() {
  const [isAgreed, setIsAgreed] = useState(false);
  return <Agree />;
}

export default App;
