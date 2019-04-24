import React, { Component } from "react";
import { Header, Footer } from "../../common";
import HanbookContent from "./Content";
import HandbookBanner from "./Banner";

import "./index.scss";
import "./media.scss";
class Handbook extends Component {
  componentDidMount() {
    document.title = "Handbook";
  }

  render() {
    return (
        <div className="handbook">
		    <Header  style={{ background: "#f2f2f2" }}/>
            <div className="banner">
                <HandbookBanner />
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
