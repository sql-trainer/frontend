import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import * as types from '../constants';
import { combineReducers } from 'redux';

import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { questions, database, test, tabs, notification, settings } from './reducers';

const appReducer = combineReducers({
    ...{ tabs, notification, questions, database },
    settings: persistReducer({ key: 'app-settings', storage }, settings),
    test: persistReducer({ key: 'test-metadata', storage, whitelist: ['testTimestamp'] }, test),
});

const rootReducer = (state, action) => {
    if (action.type === types.RESET_TEST) {
        const { notification, settings } = state;
        state = { notification, settings };
    }

    return appReducer(state, action);
};

const persistConfig = {
    key: 'test-data',
    storage,
    blacklist: ['notification', 'test', 'settings'],
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));

export default () => {
    let persistor = persistStore(store);
    return { store, persistor };
};
