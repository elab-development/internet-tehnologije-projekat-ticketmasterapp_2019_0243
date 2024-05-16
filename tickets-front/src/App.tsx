import React, { useState } from "react";
import Header from "./components/Header/Header";
import { Pages } from "./common/common.enums";
import "./App.css";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.HOME);

  const navigateToPage = (page: Pages) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Pages.HOME:
        return <div>Home</div>;
      // return <HomePage />;
      case Pages.ABOUT:
        return <div>About</div>;
      // return <AboutPage />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Header navigateToPage={navigateToPage} />
      <div className="main-content">{renderPage()}</div>
    </div>
  );
};

export default App;
