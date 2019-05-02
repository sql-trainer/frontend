import { combineReducers } from 'redux';
import questions from './questionReducer';
import database from './databaseReducer';
import test from './testReducer';
import tabs from './tabsReducer';
import notification from './notificationReducer';
import settings from './settingsReducer';

const appReducer = combineReducers({
    questions,
    database,
    test,
    tabs,
    notification,
    settings,
});

export default appReducer;
