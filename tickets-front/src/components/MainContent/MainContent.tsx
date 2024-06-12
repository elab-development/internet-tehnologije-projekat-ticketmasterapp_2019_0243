import React, { useEffect, useState } from "react";
import { Pages } from "../../common/common.enums";
import Header from "../Header/Header";
import { useAuthContext } from "../../context/auth-context";
import AboutUsPage from "../AboutUs/AboutUs";
import AdminTable from "../AdminTable/AdminTable";
import EmployeeTable from "../EmployeeTable/EmployeeTable";
import EventGrid from "../EventGrid/EventGrid";
import SignInPage from "../SignIn/SignIn";
import VenueTable from "../VenueTable/VenueTable";
import { decodeUserFromToken } from "../../common/helpers";

const MainContent: React.FC<{}> = ({}) => {
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.EVENTS);

  const { authState, setAuthState } = useAuthContext();

  useEffect(() => {
    console.log(authState);
  }, [authState]);

  useEffect(() => {
    if (authState.accessToken) {
      const { email, id, roleId } = decodeUserFromToken(authState.accessToken);
      setAuthState({ ...authState, email, id, roleId });
    } else {
      // TODO: Do something
    }
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
        return <SignInPage navigateToPage={navigateToPage} />;
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

export default MainContent;
