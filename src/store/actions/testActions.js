import * as types from '../../constants';
import store from '../../modules/store';
import retryFetch from '../../modules/retry-fetch';

import { loadQuestions, isLoading as isQuestionsLoading, setQuestions, changeCurrQuestion } from './questionActions';
import { loadDatabaseFromAPI, isLoading as isDatabaseLoading } from './databaseActions';
import { createInitialTabs } from './tabsActions';

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
    return async function(dispatch) {
        localStorage.removeItem('persist:training');
        dispatch(loadTest());
    };
};

const loadTest = (testID = 'open') => {
    return async function(dispatch, getState) {
        // dispatch(isQuestionsLoading(true));
        // dispatch(isDatabaseLoading(true));
        // dispatch(changeLoaderVisibility(true));
        // dispatch(changeTestLoaderErrorMessage(''));

        retryFetch(
            async () => {
                // const { questions, lastQuestion, testTimestamp, tabs } = store.getItems([
                //     'questions',
                //     'lastQuestion',
                //     'testTimestamp',
                //     'tabs',
                // ]);

                const testMeta = await fetch(`http://localhost:8080/api/v1/tests/${testID}/meta/`).then(res =>
                    res.json(),
                );

                // if (questions && tabs && testTimestamp === testMeta.date_changed) {
                //     const dbId = questions[lastQuestion || 0].database;

                //     dispatch(loadDatabaseFromAPI(dbId));

                //     dispatch(setQuestions(questions));
                //     dispatch(createInitialTabs(questions, tabs));
                //     dispatch(changeCurrQuestion(Number(lastQuestion) || 0));
                //     dispatch(isQuestionsLoading(false));

                //     // dispatch(addNotification('Последнее состояние восстановлено', 'info'));
                // } else {
                if (getState().test.testTimestamp !== testMeta.date_changed) {
                    dispatch(loadQuestions(testID));
                    dispatch(changeTestTimestamp(testMeta.date_changed));
                }
                // else
                // store.setItems({
                //     testTimestamp: testMeta.date_changed,
                //     lastQuestion: 0,
                // });
                // }
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
