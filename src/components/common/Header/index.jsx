import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo';
import PerfectScrollbar from 'react-perfect-scrollbar';

import './index.scss';
import './media.scss';

const Header = props => (
    <header className="header" style={props.style}>
        <div className="content">
            <div className="header__logo">
                <NavLink to="/">
                    <Logo />
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
                        <NavLink to="/handbook" activeClassName="nav-link-active">
                            Учебник
                        </NavLink>
                    </div>
                    <div className="nav-item">
                        <a href="/#">О проекте</a>
                    </div>
                </PerfectScrollbar>
                <div className="tools">
                    <div className="tool-icon reset-icon" onClick={props.resetTest} data-tip="Сбросить тест" />
                    <div className="tool-icon theme-icon" data-tip="Сменить тему" />
                    <div className="tool-icon questionmark-icon" data-tip="Справка" />
                </div>
                <div className="nav-item login-button" />
            </nav>
        </div>
    </header>
);

export default Header;
