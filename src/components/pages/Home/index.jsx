import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../common';

import './index.scss';

class Home extends Component {
    componentDidMount() {
        document.title = 'Knowledge Control System';
    }

    render() {
        return (
            <div className="home">
                <div className="wrap">
                    <Header />
                    <div className="content">
                        <main className="main">
                            {/* <div className="subtitle">От последователей самого <b>Хозяинова</b></div>*/}
                            <div className="title">Система контроля знаний SQL</div>
                            <div className="buttons">
                                <Link to="/training">Начать работу</Link>
                            </div>
                        </main>
                        <div className="more">
                            <a href="#footer">
                                <div className="more__text">Узнать больше</div>
                                <div className="more__icon">
                                    <i className="fa fa-chevron-circle-down" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <footer id="footer" className="footer">
                    <div className="content">
                        <div className="col">© 2019 sqllearning.ru Все права защищены.</div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Home;
