import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../common';

import Features from './Features';
import Steps from './Steps';
import AboutUs from './AboutUs';

import './index.scss';
import './media.scss';

class Home extends Component {
    componentDidMount() {
        document.title = 'Knowledge Control System';
        document.querySelector('.app').className = 'app home-component';
    }

    render() {
        return (
            <div className="home">
                <Header />
                <main className="main">
                    <div className="first-screen">
                        <div className="content">
                            <div className="title">
                                Сервис для изучения языка SQL
                                <Link to="/training/" className="try-service">
                                    Попробовать
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Features />

                    <AboutUs />

                    {/* <Steps /> */}
                </main>
                <Footer />
            </div>
        );
    }
}

export default Home;
