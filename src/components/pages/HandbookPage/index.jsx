import React, { Component } from "react";
import { Header, Footer } from "../../common";
import { Route } from "react-router-dom";

import Menu from "./Menu";
import IntroInSQL from "./pages/IntroInSql";
import BasicConcept from "./pages/basicConcept";

import "./index.scss";
import "./media.scss";

class HandbookPage extends Component {
	componentDidMount() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		document.title = "HandbookPage";
	}

  render() {
    return (
		<div className="handbook-page">
			<Header style={{ borderBottom: "2px solid #47515e" }} />
				<div className="wrapper">
					<Menu />
					<main className="main">
						<Route path="/handbook/intro-in-sql" component={IntroInSQL} />
						<Route path="/handbook/basic-concept" component={BasicConcept} />
					</main>
				</div>
			<Footer />
		</div>
    );
  }
}

export default HandbookPage;
