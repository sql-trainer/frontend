import React from 'react';
import { NavLink } from 'react-router-dom';
import CustomScrollbars from '../../pages/Training/CustomScrollbars';

import './index.scss';
import './media.scss';

const Header = React.memo(props => (
    <header className="header" style={props.style}>
        <div className="content">
            <div className="header__logo">
                <NavLink to="/" className="logo-link">
                    {/* <Logo /> */}
                    <div className="logo-sa">
                        <span className="left-part">SQL</span>
                        <span className="dot">.</span>ACADEMY
                    </div>
                </NavLink>
            </div>
            <nav className="header__nav">
                <CustomScrollbars className="nav-links" prefix="navbar">
                    <div className="nav-item">
                        <NavLink to="/handbook" activeClassName="nav-link-active">
                            Учебник
                        </NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink to="/training" activeClassName="nav-link-active">
                            Тренажер
                        </NavLink>
                    </div>
                </CustomScrollbars>
                <div className="tools">
                    {/* <div className="tool-icon settings-icon" data-tip="Настройки" onClick={props.openSettingsModal} />
                    <div className="tool-icon login-button" /> */}
                </div>
            </nav>
        </div>
    </header>
));

export default Header;
