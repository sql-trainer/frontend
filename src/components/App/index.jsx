import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import { Handbook, HandbookPage } from '../pages/';
import { NotificationsContainer as Notifications } from '../common/Notifications/containers';
import DynamicImport from '../common/DynamicImport';

import './index.scss';
import '../../styles/scrollbar.scss';

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
                <Route exact path="/handbook" component={Handbook} key="handbook" />
                <Route path="/handbook" component={HandbookPage} />
                <Route component={NotFound} />
            </Switch>

            <ReactTooltip type="info" effect="solid" delayShow={500} />
            <Notifications />
        </div>
    );
};

export default App;
