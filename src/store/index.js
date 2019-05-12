import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist';
import * as types from '../constants';

import storage from 'redux-persist/lib/storage';

import { questions, database, test, tabs, notification, settings, ac } from './reducers';

const persistConfig = {
    key: 'training',
    storage,
    blacklist: ['notification', 'settings', 'questions', 'test', 'database', 'tabs', 'ac'],
};

const appReducer = persistCombineReducers(persistConfig, {
    ...{ notification, ac },
    questions: persistReducer(
        { key: 'test-questions', storage, whitelist: ['questions', 'currQuestionIndex'] },
        questions,
    ),
    tabs: persistReducer({ key: 'test-tabs', storage }, tabs),
    test: persistReducer({ key: 'test-metadata', storage, whitelist: ['testTimestamp', 'isTestCompleted'] }, test),
    database: persistReducer({ key: 'test-database', storage, blacklist: ['isDatabaseLoading'] }, database),
    settings: persistReducer({ key: 'app-settings', storage }, settings),
});

const rootReducer = (state, action) => {
    if (action.type === types.RESET_TEST) {
        const { notification, settings } = state;
        localStorage.removeItem('persist:test-tabs');
        localStorage.removeItem('persist:test-metadata');
        localStorage.removeItem('persist:test-database');
        localStorage.removeItem('persist:test-questions');
        state = { notification, settings };
    }

    return appReducer(state, action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default () => {
    let persistor = persistStore(store);
    return { store, persistor };
};
