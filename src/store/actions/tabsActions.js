import * as types from '../../constants';

const createNewTab = () => {
    return {
        type: types.CREATE_NEW_TAB,
        payload: {
            html: '',
            title: 'Tab',
            response: undefined,
        },
    };
};

const changeTab = index => {
    return {
        type: types.CHANGE_TAB,
        index,
    };
};

const deleteTab = () => {
    return {
        type: types.DELETE_TAB,
    };
};

const deleteAllTabs = (html = '') => {
    return {
        type: types.DELETE_ALL_TABS,
        html,
    };
};

const changeTabResponse = (index, response) => {
    return {
        type: types.CHANGE_TAB_RESPONSE,
        index,
        response,
    };
};

const changeTabHtml = (index, html) => {
    return {
        type: types.CHANGE_TAB_HTML,
        html,
        index,
    };
};

export { createNewTab, changeTab, deleteTab, changeTabResponse, deleteAllTabs, changeTabHtml };
