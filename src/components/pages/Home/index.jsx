import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../common';

import Features from './Features';
import Steps from './Steps';
import AboutUs from './AboutUs';

import './index.scss';

class Home extends Component {
    componentDidMount() {
        document.title = 'Knowledge Control System';
    }

    render() {
        return (
            <div className="home">
                <Header />
                <main className="main">
                    <div className="first-screen">
                        <div className="content">
                            <div className="title">
                                Система контроля знаний BLABLABLA
                                <br />
                                <Link to="/training">Попробовать</Link>
                            </div>
                        </div>
                    </div>

                    <Features />

                    <AboutUs />

                    <Steps />
                </main>
                <Footer />
            </div>
        );
    }
}

export default Home;
