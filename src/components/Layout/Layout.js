import React from "react";
import { Outlet, Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <div className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <nav className="navbar-links">
            <p>
              <Link className="text-link" to="/">Transactions</Link>
            </p>
            <p>
              <Link className="text-link" to="/books">Books</Link>
            </p>
            <p>
              <Link className="text-link" to="/users">Users</Link>
            </p>
        </nav>
      </div>

      <div className="outlet">
        <Outlet />
      </div>
    </div>
  )
};

export default Layout;