import * as types from '../../constants';

const changePopupVisibility = visible => {
    return {
        type: types.CHANGE_COMPLETED_POPUP_VISIBILITY,
        visible,
    };
};

const changeTestStatus = status => {
    return {
        type: types.CHANGE_TEST_STATUS,
        status,
    };
};

export { changePopupVisibility, changeTestStatus };
