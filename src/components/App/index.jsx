import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from '../pages/NotFound';
import { Home, Training, LogoPresentation } from '../pages/';

import './index.scss';
import '../../styles/vars.scss';
import 'font-awesome/css/font-awesome.min.css';

const App = () => {
    return (
        <div className="app">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/training" component={Training} />
                <Route path="/logo" component={LogoPresentation} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};

export default App;
