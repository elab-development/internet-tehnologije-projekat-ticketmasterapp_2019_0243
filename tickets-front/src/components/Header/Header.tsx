import React from "react";
import { Pages } from "../../common/common.enums";
import "./Header.css";

const Header: React.FC<{ navigateToPage: (page: Pages) => void }> = ({
  navigateToPage,
}) => {
  return (
    <header className="header">
      <div className="title">Ticketmaster</div>
      <nav className="menu">
        <ul>
          <li onClick={() => navigateToPage(Pages.HOME)}>
            <p>Home</p>
          </li>
          <li onClick={() => navigateToPage(Pages.EVENTS)}>
            <p>Events</p>
          </li>
          {/* TODO: Show only to admin */}
          <li onClick={() => navigateToPage(Pages.ADMIN_TABLE)}>
            <p>Admin view</p>
          </li>
          <li onClick={() => navigateToPage(Pages.ABOUT)}>
            <p>About</p>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
