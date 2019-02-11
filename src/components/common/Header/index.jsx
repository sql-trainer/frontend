import React from 'react';
import { Link } from 'react-router-dom';

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
                <div className="nav-links">
                    <div className="nav-item">
                        <Link to="/training">Тренажер</Link>
                    </div>
                    <div className="nav-item">
                        <a href="/#">Учебник</a>
                    </div>
                    <div className="nav-item">
                        <a href="/#">О проекте</a>
                    </div>
                </div>
                <div className="nav-item login-button">
                    <a href="/#">Войти</a>
                </div>
            </nav>
        </div>
    </header>
);

export default Header;
