import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./index.scss";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="content">
          <div className="header__logo">
            <div className="logo" />
          </div>
          <nav className="header__nav">
            <div className="nav-item">
              <Link to="/training">Тренажер</Link>
            </div>
            <div className="nav-item">
              <a href="/#">О проекте</a>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
