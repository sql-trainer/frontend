import * as types from '../../constants';

const initialState = {
    isCompletedPopupVisible: false,
    isTestCompleted: false,
    isTestLoaderVisible: true,
    testLoaderErrorMessage: '',
};

const tabs = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_COMPLETED_POPUP_VISIBILITY:
            return {
                ...state,
                isCompletedPopupVisible: action.visible,
            };

        case types.CHANGE_LOADER_VISIBILITY:
            return {
                ...state,
                isTestLoaderVisible: action.visible,
            };

        case types.CHANGE_TEST_STATUS:
            return {
                ...state,
                isTestCompleted: action.status,
            };

        case types.LOADER_ERROR:
            return {
                ...state,
                testLoaderErrorMessage: action.message,
            };

        default:
            return state;
    }
};

export default tabs;
