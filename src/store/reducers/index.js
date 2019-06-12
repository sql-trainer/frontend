import questions from './questionReducer';
import database from './databaseReducer';
import test from './testReducer';
import tabs from './tabsReducer';
import notification from './notificationReducer';
import settings from './settingsReducer';
import ac from './autocompleteReducer';
import handbookPage from './handbookPageReducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
    questions,
    database,
    test,
    tabs,
    notification,
    settings,
    handbookPage
});

export { questions, database, test, tabs, notification, settings, ac, handbookPage };
export default appReducer;
