import React from 'react';
import { NavLink } from 'react-router-dom';

import PerfectScrollbar from 'react-perfect-scrollbar';

import './index.scss';
import './media.scss';

const Header = props => (
    <header className="header" {...props}>
        <div className="content">
            <div className="header__logo">
                <NavLink to="/">
                    <div className="logo">
                        <div className="logo__quarter" />
                        <div className="logo__quarter" />
                        <div className="logo__quarter" />
                        <div className="logo__quarter" />
                    </div>
                </NavLink>
            </div>
            <nav className="header__nav">
                <PerfectScrollbar className="nav-links" suppressScrollY={true}>
                    <div className="nav-item">
                        <NavLink to="/training" activeClassName="nav-link-active">
                            Тренажер
                        </NavLink>
                    </div>
                    <div className="nav-item">
                        <a href="/#">Учебник</a>
                    </div>
                    <div className="nav-item">
                        <a href="/#">О проекте</a>
                    </div>
                </PerfectScrollbar>
                <div className="nav-item login-button">
                    <a href="/#">Войти</a>
                </div>
            </nav>
        </div>
    </header>
);

export default Header;
