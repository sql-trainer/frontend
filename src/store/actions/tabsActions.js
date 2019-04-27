import * as types from '../../constants';
import store from '../../modules/store';

const createNewTab = id => {
    return {
        type: types.CREATE_NEW_TAB,
        payload: {
            html: '',
            title: 'Tab',
            response: undefined,
        },
        id,
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

const pinInputArea = () => ({ type: types.PIN_INPUT_AREA });

const changeSQLResponseType = (SQLResponseType, tid, qid) => ({
    type: types.CHANGE_SQL_RESPONSE_TYPE,
    SQLResponseType,
    tid,
    qid,
});

const saveTabsToLocalStorage = () => {
    return async function(dispatch, getState) {
        console.log(getState().tabs.tabs);
        store.setItems({ tabs: getState().tabs.tabs });
    };
};

export {
    createNewTab,
    changeTab,
    deleteTab,
    changeTabResponse,
    changeTabHtml,
    pinInputArea,
    createInitialTabs,
    isChecking,
    changeSQLResponseType,
    saveTabsToLocalStorage,
};
