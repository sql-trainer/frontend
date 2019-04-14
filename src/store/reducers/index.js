import { combineReducers } from 'redux';
import questions from './questionReducer';
import database from './databaseReducer';
import test from './testReducer';
import tabs from './tabsReducer';
import notification from './notificationReducer';

const reducers = combineReducers({
    questions,
    database,
    test,
    tabs,
    notification,
});

export default reducers;
