import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import { Pages } from "./common/common.enums";
import "./App.css";
import EventGrid from "./components/EventGrid/EventGrid";
import AdminTable from "./components/AdminTable/AdminTable";
import AboutUsPage from "./components/AboutUs/AboutUs";
import VenueTable from "./components/VenueTable/VenueTable";
import EmployeeTable from "./components/EmployeeTable/EmployeeTable";
import { AuthProvider, useAuthContext } from "./context/auth-context";
import { AxiosProvider } from "./context/axios-context";
import SignInPage from "./components/SignIn/SignIn";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.EVENTS);

  const { authState, setAuthState } = useAuthContext();

  useEffect(() => {
    console.log(authState);
  }, []);

  const navigateToPage = (page: Pages) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
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
      case Pages.AUTH:
        return <SignInPage />;
      default:
        return null;
    }
  };

  return (
    <AuthProvider>
      <AxiosProvider>
        <div className="App">
          <Header navigateToPage={navigateToPage} />
          <div className="main-content">{renderPage()}</div>
        </div>
      </AxiosProvider>
    </AuthProvider>
  );
};

export default App;
