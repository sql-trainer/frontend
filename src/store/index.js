import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import * as types from '../constants';

import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import appReducer from './reducers';

const rootReducer = (state, action) => {
    if (action.type === types.RESET_TEST) {
        const { notification, settings } = state;
        state = { notification, settings };
    }

    return appReducer(state, action); 
}

const persistConfig = {
    key: 'training',
    storage,
    blacklist: ['notification'],
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));

export default () => {
    let persistor = persistStore(store);
    return { store, persistor };
};