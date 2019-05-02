import * as types from '../../constants';
import { REHYDRATE } from 'redux-persist';

const initialState = {
    isCompletedPopupVisible: false,
    isTestCompleted: false,
    isTestLoaderVisible: true,
    testLoaderErrorMessage: '',
    isLogoVisible: true,
    testTimestamp: null,
};

const test = (state = initialState, action) => {
    switch (action.type) {
        case REHYDRATE: {
            if (action.payload)
                return {
                    ...state,
                    isTestLoaderVisible: false,
                    testTimestamp: action.payload.test.testTimestamp,
                };
            else return { ...state };
        }

        case types.CHANGE_COMPLETED_POPUP_VISIBILITY:
            return {
                ...state,
                isCompletedPopupVisible: action.visible,
            };

        case types.CHANGE_TEST_TIMESTAMP:
            return {
                ...state,
                testTimestamp: action.testTimestamp,
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
                isLogoVisible: action.isLogoVisible,
            };

        default:
            return state;
    }
};

export default test;
