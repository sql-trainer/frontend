import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Loadable from 'react-loadable';

import Loader from '../common/Loader';
import { NotificationsContainer as Notifications } from '../common/Notifications/containers';

import './index.scss';
import '../../styles/scrollbar.scss';

import '../../icons';

const Home = Loadable({
    loader: () => import('../pages/Home'),
    loading: Loader,
});

const Training = Loadable({
    loader: () => import('../pages/Training/containers'),
    loading: Loader,
});

const Handbook = Loadable({
    loader: () => import('../pages/Handbook'),
    loading: Loader,
});

const HandbookPage = Loadable({
    loader: () => import('../pages/HandbookPage'),
    loading: Loader,
});


const NotFound = Loadable({
    loader: () => import('../pages/NotFound'),
    loading: Loader,
});

const App = props => {
    return (
        <div className="app">
            <Switch>
                <Route exact path="/" component={Home} key="home" />
                <Route path="/training" component={Training} key="training" />
                <Route exact path="/handbook" component={Handbook} key="handbook" />
                <Route path="/handbook" component={HandbookPage} />
                <Route component={NotFound} />
            </Switch>

            <ReactTooltip type="info" effect="solid" delayShow={300} multiline={false} />
            <Notifications />
        </div>
    );
};

export default App;
