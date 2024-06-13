import React from "react";
import { Pages } from "../../common/common.enums";
import "./Header.css";
import { useAuthContext } from "../../context/auth-context";

const Header: React.FC<{ navigateToPage: (page: Pages) => void }> = ({
  navigateToPage,
}) => {
  const { authState, clearTokensOnLogout } = useAuthContext();

  const handleAuth = () => {
    if (authState.accessToken) {
      navigateToPage(Pages.EVENTS);
      clearTokensOnLogout();
    } else {
      navigateToPage(Pages.AUTH);
    }
  };

  return (
    <header className="header">
      <div className="title">Ticketmaster</div>
      <nav className="menu">
        <ul>
          <li onClick={() => navigateToPage(Pages.EVENTS)}>
            <p>Events</p>
          </li>
          {authState.roleId === 2 && (
            <li onClick={() => navigateToPage(Pages.TICKETS)}>
              <p>My tickets</p>
            </li>
          )}
          {authState.roleId === 1 && (
            <li onClick={() => navigateToPage(Pages.ADMIN_TABLE)}>
              <p>Event table</p>
            </li>
          )}
          {authState.roleId === 1 && (
            <li onClick={() => navigateToPage(Pages.VENUE_TABLE)}>
              <p>Venue table</p>
            </li>
          )}
          {authState.roleId === 1 && (
            <li onClick={() => navigateToPage(Pages.EMPLOYEE_TABLE)}>
              <p>Employee table</p>
            </li>
          )}
          <li onClick={() => navigateToPage(Pages.ABOUT)}>
            <p>About</p>
          </li>
          <li onClick={() => handleAuth()}>
            <p> {authState.accessToken ? "Sign out" : "Sign in"}</p>
          </li>
          {!authState.accessToken && (
            <li onClick={() => navigateToPage(Pages.REGISTER)}>
              <p>Register</p>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
