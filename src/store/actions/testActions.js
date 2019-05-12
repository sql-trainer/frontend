import * as types from '../../constants';
import retryFetch from '../../modules/retry-fetch';
import persist from '../index.js';

import { changeSolvedQuestionSQL } from './questionActions';
import { changeTabResponse, isChecking, changeSQLResponseType } from './tabsActions';
import { addNotification } from './notificationActions';
import { createDatabaseKeywords } from './autocompleteActions';

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

        let responseType = 'error';

        dispatch(isChecking(currQuestion.id, currTabIndex, true));

        setTimeout(() => {
            fetch(`http://localhost:8080/api/v1/tests/open/questions/${currQuestion.id}/check`, {
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
                            // if (currQuestion.status !== 'solved') dispatch(changeQuestionStatus('solved'));
                            dispatch(changeSolvedQuestionSQL(sql));
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
                    dispatch(changeSQLResponseType(responseType, currTabIndex, currQuestion.id));
                });
        }, 1000);
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
                } else {
                    dispatch(createDatabaseKeywords());
                    dispatch(changeLoaderVisibility(false));
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
    checkSQL,
};
