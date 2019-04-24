import React, { Component } from "react";
import { Header, Footer } from "../../common";

import { Route } from 'react-router-dom';

import Menu from './Menu';

import IntroInSQL from './pages/IntroInSql'

import "./index.scss";

class HandbookPage extends Component {
  componentDidMount() {
    document.title = "HandbookPage";
  }

  render() {
    return (
        <div className="handbook-page">
            <Header style={{ borderBottom: "2px solid #47515e" }}/>
                <div className="wrapper">
					<aside className="aside">
              			<Menu />
					</aside>
					<main className="main">
						<Route path="/handbook/intro-in-sql" component={IntroInSQL} />
					</main>
				</div>
            <Footer />
      </div>
    );
  }
}

export default HandbookPage;
