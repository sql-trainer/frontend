import { createSelector } from 'reselect';

export const getCurrentQuestion = ({ questions: { questions, currQuestionIndex } }) =>
    questions.length ? questions[currQuestionIndex] : {};

const getTabs = ({ tabs: { tabs } }) => tabs;
const getDatabase = ({ database: { database } }) => database;

export const getCurrentTabIndex = createSelector(
    [getCurrentQuestion, getTabs],
    (currQ, tabs) => (tabs[currQ.id] || {}).currTabIndex || 0,
);

export const getCurrentTabs = createSelector(
    [getCurrentQuestion, getTabs],
    (currQ, tabs) => (tabs[currQ.id] || {})['tabs'] || [{ html: '', title: 'Tab' }],
);

export const getCurrentTab = createSelector(
    [getCurrentTabIndex, getCurrentTabs],
    (currTabIndex, tabs) => tabs[currTabIndex],
);

export const getCurrentTables = createSelector(
    [getDatabase],
    database => database.tables.map(t => t.title),
);
