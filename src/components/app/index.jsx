import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "../notFound";
import { Home, Training } from "../pages/";

import "./index.scss";

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/training" component={Training} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
