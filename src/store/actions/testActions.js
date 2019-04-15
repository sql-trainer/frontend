import * as types from '../../constants';
import store from '../../modules/store';
import { loadQuestionsFromAPI } from './questionActions';

const changePopupVisibility = visible => {
    return { type: types.CHANGE_COMPLETED_POPUP_VISIBILITY, visible };
};

const changeLoaderVisibility = visible => {
    return { type: types.CHANGE_LOADER_VISIBILITY, visible };
};

const changeTestStatus = status => {
    return { type: types.CHANGE_TEST_STATUS, status };
};

const changeTestLoaderErrorMessage = message => {
    return { type: types.LOADER_ERROR, message };
};

const resetTest = () => {
    return async function(dispatch) {
        store.removeItems(['questions', 'testTimestamp', 'lastQuestion', 'tabs']);
        dispatch(loadQuestionsFromAPI());
        dispatch(changePopupVisibility(false));
    };
};

export { changePopupVisibility, changeTestStatus, changeLoaderVisibility, changeTestLoaderErrorMessage, resetTest };
