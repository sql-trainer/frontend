import * as types from '../../constants';

const initialState = {
    isCompletedPopupVisible: false,
    isTestCompleted: false,
};

const tabs = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_COMPLETED_POPUP_VISIBILITY:
            return {
                ...state,
                isCompletedPopupVisible: action.visible,
            };

        case types.CHANGE_TEST_STATUS:
            return {
                ...state,
                isTestCompleted: action.status,
            };

        default:
            return state;
    }
};

export default tabs;
