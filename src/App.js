import React from "react";
import "./App.css";
import Lobby from "./components/pages/Lobby";
import Header from "./components/layout/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Lobby />
    </div>
  );
}

export default App;
