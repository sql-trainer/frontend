import { createSelector } from 'reselect';

export const getCurrentQuestion = ({ questions: { questions, currQuestionIndex } }) =>
    questions.length ? questions[currQuestionIndex] : {};

const getTabs = ({ tabs: { tabs } }) => tabs;
const getDatabase = ({ database: { database } }) => database;
const getShortcuts = ({ settings: { shortcuts } }) => shortcuts;

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

export const getGlobalKeyMap = createSelector(
    [getShortcuts],
    shortcuts => {
        const globalKeyMap = {};
        Object.entries(shortcuts['global']).forEach(k => (globalKeyMap[k[0]] = k[1].sequence.join('+')));
        return globalKeyMap;
    },
);

export const getShortcutSequences = createSelector(
    [getShortcuts],
    shortcuts => {
        const sequences = [];
        Object.keys(shortcuts).forEach(env =>
            Object.values(shortcuts[env]).forEach(key => sequences.push(key.sequence)),
        );
        return sequences;
    },
);
