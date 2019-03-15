import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import NotFound from '../pages/NotFound';
import { Home, Training, LogoPresentation } from '../pages/';

import '../../styles/vars.scss';
import './index.scss';
import '../../styles/scrollbar.css';

import '../../icons';

const App = () => {
    return (
        <div className="app">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/training" component={Training} />
                <Route path="/logo" component={LogoPresentation} />
                <Route component={NotFound} />
            </Switch>
            <ReactTooltip type="info" effect="solid" delayShow={500} />
        </div>
    );
};

export default App;
