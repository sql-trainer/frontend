import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import { NotificationsContainer as Notifications } from '../common/Notifications/containers';
import DynamicImport from '../common/DynamicImport';

import './index.scss';
import '../../styles/scrollbar.css';

import '../../icons';

const Home = props => <DynamicImport load={() => import('../pages/Home')} importKey="home" />;

const TrainingContainer = props => (
    <DynamicImport load={() => import('../pages/Training/containers')} importKey="training" />
);

const NotFound = props => <DynamicImport load={() => import('../pages/NotFound')} importKey="notfound" />;

const App = props => {
    return (
        <div className="app">
            <Switch>
                <Route exact path="/" component={Home} key="home" />
                <Route path="/training" component={TrainingContainer} key="training" />
                <Route component={NotFound} />
            </Switch>

            <ReactTooltip type="info" effect="solid" delayShow={500} />
            <Notifications />
        </div>
    );
};

export default withRouter(App);
