import React, { Component } from "react";
import { Header, Footer } from "../../common";

import { Route } from 'react-router-dom';
import IntroInSQL from './pages/IntroInSql'
import "./index.scss";

class HandbookPage extends Component {
  componentDidMount() {
    document.title = "HandbookPage";
  }

  render() {
    return (
        <div className="handbook-page">
            <Header />
            <div className="main">
              <Route path="/handbook/intro-in-sql" component={IntroInSQL} />
            </div>
            <Footer />
      </div>
    );
  }
}

export default HandbookPage;
