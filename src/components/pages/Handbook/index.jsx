import React, { Component } from "react";
import { Header, Footer } from "../../common";
import HanbookContent from "./Content";

import "./index.scss";

class Handbook extends Component {
  componentDidMount() {
    document.title = "Handbook";
  }

  render() {
    return (
        <div className="handbook">
            <div className="banner">
                <Header />
            </div>

            <div className="page__inner">
                <HanbookContent />
            </div>

            <Footer />
      </div>
    );
  }
}

export default Handbook;
