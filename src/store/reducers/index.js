import { combineReducers } from 'redux';
import questions from './questionReducer';
import database from './databaseReducer';
import tabs from './tabsReducer';

const reducers = combineReducers({
    questions,
    database,
    tabs,
});

export default reducers;
