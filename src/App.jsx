import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import Dashboard from "./components/dashboard/dashboard.jsx";
import RawdataRoute from "./pages/rawdata";
import CommandsRoute from "./pages/commands";
import CalculatorsRoute from "./pages/calculators";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Dashboard />
    </>
  );
}

export default App;
