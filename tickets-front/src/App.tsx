import React from "react";
import "./App.css";
import Header from "./components/Header/Header";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="main-content"></div>
    </div>
  );
};

export default App;
