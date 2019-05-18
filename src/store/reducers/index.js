import { combineReducers } from 'redux';
import questions from './questionReducer';
import database from './databaseReducer';
import test from './testReducer';
import tabs from './tabsReducer';
import notification from './notificationReducer';
import settings from './settingsReducer';
import ac from './autocompleteReducer';

const appReducer = combineReducers({
    questions,
    database,
    test,
    tabs,
    notification,
    settings,
});

export { questions, database, test, tabs, notification, settings, ac };
export default appReducer;
