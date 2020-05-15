import React from "react";
import { Provider } from "react-redux";
import { Router } from "@reach/router";
import store from "./store";
import Lobby from "./components/pages/Lobby";
import Header from "./components/layout/Header";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Router>
          <Lobby path="/" />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
