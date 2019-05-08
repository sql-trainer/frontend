import * as types from '../../constants';
import { addNotification } from './notificationActions';

const createNewTab = id => {
    return {
        type: types.CREATE_NEW_TAB,
        payload: {
            html: '',
            title: 'Tab',
        },
        id,
    };
};

const copyAnswerToClipboard = html => {
    return async dispatch => {
        navigator.clipboard
            .writeText(html)
            .then(() => dispatch(addNotification('Скопировано', 'info')))
            .catch(() => dispatch(addNotification('Ошибка при копировании', 'error')));
    };
};

const changeTab = (tid, qid) => {
    return {
        type: types.CHANGE_TAB,
        tid,
        qid,
    };
};

const nextTab = qid => {
    return function(dispatch, getState) {
        const tabs = getState().tabs.tabs;
        const newTab = tabs[qid].currTabIndex + 1 > tabs[qid].tabs.length - 1 ? 0 : tabs[qid].currTabIndex + 1;

        console.log(newTab);
        dispatch(changeTab(newTab, qid));
    };
};

const prevTab = qid => {
    return function(dispatch, getState) {
        const tabs = getState().tabs.tabs;
        const newTab = tabs[qid].currTabIndex - 1 < 0 ? tabs[qid].tabs.length - 1 : tabs[qid].currTabIndex - 1;

        dispatch(changeTab(newTab, qid));
    };
};

const createInitialTabs = (questions, initialTabs = {}) => {
    return {
        type: types.CREATE_INITIAL_TABS,
        questions,
        initialTabs,
    };
};

const deleteTab = qid => {
    return {
        type: types.DELETE_TAB,
        qid,
    };
};

const changeTabResponse = (qid, tid, response) => {
    return {
        type: types.CHANGE_TAB_RESPONSE,
        qid,
        tid,
        response,
    };
};

const changeTabHtml = (index, html, id) => {
    return {
        type: types.CHANGE_TAB_HTML,
        html,
        index,
        id,
    };
};

const isChecking = (qid, tid, checking) => ({ type: types.SQL_CHECKING, qid, tid, checking });

const changeSQLResponseType = (SQLResponseType, tid, qid) => ({
    type: types.CHANGE_SQL_RESPONSE_TYPE,
    SQLResponseType,
    tid,
    qid,
});

export {
    createNewTab,
    changeTab,
    deleteTab,
    changeTabResponse,
    changeTabHtml,
    createInitialTabs,
    isChecking,
    changeSQLResponseType,
    copyAnswerToClipboard,
    prevTab,
    nextTab,
};
