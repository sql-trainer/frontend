import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import NotFound from '../pages/NotFound';
import { Home, TrainingContainer, Handbook, HandbookPage } from '../pages/';
import { NotificationsContainer as Notifications } from '../common/Notifications/containers';

import './index.scss';
import '../../styles/scrollbar.css';

import '../../icons';

const App = props => {
    return (
        <div className="app">
            <Switch>
                <Route exact path="/" component={Home} key="home" />
                <Route path="/training" component={TrainingContainer} key="training" />
                <Route exact path="/handbook" component={Handbook} key="handbook" />
                <Route path="/handbook" component={HandbookPage} />
                <Route component={NotFound} />
            </Switch>

            <ReactTooltip type="info" effect="solid" delayShow={500} />
            <Notifications />
        </div>
    );
};

export default withRouter(App);
