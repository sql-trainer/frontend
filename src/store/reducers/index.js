import { combineReducers } from 'redux';
import questions from './questionReducer';
import database from './databaseReducer';
import test from './testReducer';
import notification from './notificationReducer';

const reducers = combineReducers({
    questions,
    database,
    test,
    notification,
});

export default reducers;
