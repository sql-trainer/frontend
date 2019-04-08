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

const changeTabResponse = ({ question, tab, response }) => {
    return {
        type: types.CHANGE_TAB_RESPONSE,
        question,
        tab,
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

const pinInputArea = () => ({ type: types.PIN_INPUT_AREA });

export { createNewTab, changeTab, deleteTab, changeTabResponse, changeTabHtml, pinInputArea };
