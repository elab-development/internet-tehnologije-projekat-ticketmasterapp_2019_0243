import React from "react";
import Header from "./components/Header/Header";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="main-content"></div>
    </div>
  );
};

export default App;
