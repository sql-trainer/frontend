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

const changeTab = (index, id) => {
    return {
        type: types.CHANGE_TAB,
        index,
        id,
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
};
