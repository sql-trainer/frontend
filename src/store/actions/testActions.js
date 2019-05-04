import * as types from '../../constants';
import retryFetch from '../../modules/retry-fetch';
import persist from '../index.js';

import { loadQuestions, isLoading as isQuestionsLoading } from './questionActions';
import { isLoading as isDatabaseLoading } from './databaseActions';

const changePopupVisibility = visible => {
    return { type: types.CHANGE_COMPLETED_POPUP_VISIBILITY, visible };
};

const changeLoaderVisibility = visible => {
    return { type: types.CHANGE_LOADER_VISIBILITY, visible };
};

const changeTestStatus = status => {
    return { type: types.CHANGE_TEST_STATUS, status };
};

const changeTestTimestamp = testTimestamp => {
    return { type: types.CHANGE_TEST_TIMESTAMP, testTimestamp };
};

const changeTestLoaderErrorMessage = (message, isLogoVisible = true) => {
    return { type: types.LOADER_ERROR, message, isLogoVisible };
};

const resetTest = () => {
    return async function(dispatch, getState) {
        dispatch({ type: 'RESET_TEST' });
        persist().persistor.flush();
        dispatch(loadTest());
    };
};

const loadTest = (testID = 'open') => {
    return async function(dispatch, getState) {
        retryFetch(
            async () => {
                const timestamp = getState().test.testTimestamp;
                const testMeta = await fetch(`http://localhost:8080/api/v1/tests/${testID}/meta/`).then(res =>
                    res.json(),
                );

                if (timestamp !== testMeta.date_changed) {
                    if (timestamp !== null) {
                        dispatch({ type: 'RESET_TEST' });
                        persist().persistor.flush();
                    }
                    dispatch(loadQuestions(testID));
                    dispatch(changeTestTimestamp(testMeta.date_changed));
                }
            },
            {
                onLastAttempt: () => {
                    dispatch(
                        changeTestLoaderErrorMessage('Произошла ошибка при загрузке вопросов, попробуйте позже', false),
                    );
                    dispatch(isQuestionsLoading(false));
                    dispatch(isDatabaseLoading(false));
                },
                onAttempt: attempt => {
                    dispatch(changeTestLoaderErrorMessage(`Не удалось загрузить вопросы, пробуем ещё раз...`));
                },
            },
        );
    };
};

export {
    changePopupVisibility,
    changeTestStatus,
    changeLoaderVisibility,
    changeTestLoaderErrorMessage,
    resetTest,
    loadTest,
};
