import React from 'react';
import { Link } from 'react-router-dom';

import PerfectScrollbar from 'react-perfect-scrollbar';

// import 'react-perfect-scrollbar/dist/css/styles.css';
import './index.scss';

const Header = props => (
    <header className="header">
        <div className="content">
            <div className="header__logo">
                <div className="logo">
                    <div className="logo__quarter" />
                    <div className="logo__quarter" />
                    <div className="logo__quarter" />
                    <div className="logo__quarter" />
                </div>
            </div>
            <nav className="header__nav">
                <PerfectScrollbar className="nav-links" suppressScrollY={true}>
                    <div className="nav-item">
                        <Link to="/training">Тренажер</Link>
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
