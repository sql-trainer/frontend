import * as types from '../../constants';
import retryFetch from '../../modules/retry-fetch';
import persist from '../index.js';

import { changeQuestionAnswer } from './questionActions';
import { changeTabResponse, isChecking, changeIndicatorType } from './tabsActions';
import { addNotification } from './notificationActions';
import { createDatabaseKeywords } from './autocompleteActions';
import { loadDatabaseFromAPI } from './databaseActions';

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

const checkTestResult = questions => {
    return questions.findIndex(q => q.status !== 'solved') === -1;
};

const checkSQL = (qid, tid) => {
    return async (dispatch, getState) => {
        const state = getState();
        const currQuestion = state.questions.questions[qid];
        const currTab = state.tabs.tabs[currQuestion.id].tabs[tid];
        const currTabIndex = tid;
        const isTestCompleted = state.test.isTestCompleted;
        const sql = currTab.html;
        console.log(sql);

        let responseType = 'error';

        dispatch(isChecking(currQuestion.id, currTabIndex, true));

        setTimeout(() => {
            fetch(`/api/v1/tests/open/questions/${currQuestion.id}/check/`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sql }),
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        dispatch(addNotification(res.error.message, 'error'));
                    } else {
                        if (res.success) {
                            dispatch(changeQuestionAnswer(sql));
                            responseType = 'success';
                            if (!isTestCompleted && checkTestResult(state.questions.questions)) {
                                dispatch(changePopupVisibility(true));
                                dispatch(changeTestStatus(true));
                            }
                        }

                        dispatch(
                            changeTabResponse(currQuestion.id, currTabIndex, { fields: res.fields, rows: res.rows }),
                        );
                    }
                })
                .catch(err => dispatch(addNotification('Ошибка сервера', 'error')))
                .finally(() => {
                    dispatch(isChecking(currQuestion.id, currTabIndex, false));
                    dispatch(changeIndicatorType(responseType, currTabIndex, currQuestion.id));
                });
        }, 1000);
    };
};

const loadTest = (testID = 'open') => {
    return async function(dispatch, getState) {
        retryFetch(
            async () => {
                const state = getState();
                const timestamp = getState().test.testTimestamp;
                const testMeta = await fetch(`/api/v1/tests/${testID}/meta/`).then(res => res.json());

                if (timestamp !== testMeta.date_changed) {
                    dispatch(loadQuestions(testID));
                    dispatch(changeTestTimestamp(testMeta.date_changed));
                } else {
                    const currQuestion = state.questions.questions[state.questions.currQuestionIndex];
                    if (currQuestion.database !== state.database.id) {
                        dispatch(loadDatabaseFromAPI(currQuestion.database));
                    } else {
                        dispatch(createDatabaseKeywords());
                        dispatch(changeLoaderVisibility(false));
                    }
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

const resetTest = () => {
    return function(dispatch, getState) {
        dispatch({ type: types.RESET_TEST });
        persist().persistor.flush();
        dispatch(loadTest('open'));
    };
};

export {
    changePopupVisibility,
    changeTestStatus,
    changeLoaderVisibility,
    changeTestLoaderErrorMessage,
    resetTest,
    loadTest,
    checkSQL,
};
