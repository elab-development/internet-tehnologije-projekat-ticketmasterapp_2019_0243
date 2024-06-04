import React, { useState } from "react";
import Header from "./components/Header/Header";
import { Pages } from "./common/common.enums";
import "./App.css";
import EventGrid from "./components/EventGrid/EventGrid";
import AdminTable from "./components/AdminTable/AdminTable";
import AboutUsPage from "./components/AboutUs/AboutUs";
import VenueTable from "./components/VenueTable/VenueTable";
import EmployeeTable from "./components/EmployeeTable/EmployeeTable";

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
      case Pages.EVENTS:
        return <EventGrid />;
      case Pages.ADMIN_TABLE:
        return <AdminTable />;
      case Pages.ABOUT:
        return <AboutUsPage />;
      case Pages.VENUE_TABLE:
        return <VenueTable />;
      case Pages.EMPLOYEE_TABLE:
        return <EmployeeTable />;
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
