import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/vars.scss';

import App from './components/App/';
import store from './store/';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename="/frontend">
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);
