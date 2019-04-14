import * as types from '../../constants';
import { loadDatabaseFromAPI, isLoading as isDatabaseLoading } from './databaseActions';
import { addNotification } from './notificationActions';
import { createInitialTabs } from './tabsActions';
import { changeLoaderVisibility, changeTestLoaderErrorMessage } from './testActions';
import retryFetch from '../../modules/retry-fetch';
import store from '../../modules/store';

const setQuestions = payload => ({ type: types.QUESTIONS_LOADED, payload });

const loadDatabaseOnChange = index => {
    return function(dispatch, getState) {
        const state = getState();
        if (!state.database.database || state.questions.questions[index].database !== state.database.database.id) {
            dispatch(loadDatabaseFromAPI(state.questions.questions[index].database));
        }
        dispatch(changeCurrQuestion(index));
    };
};

const nextQuestion = () => {
    return function(dispatch, getState) {
        const state = getState();
        const newQuestion =
            state.questions.currQuestionIndex + 1 > state.questions.questions.length - 1
                ? 0
                : state.questions.currQuestionIndex + 1;

        dispatch(loadDatabaseOnChange(newQuestion));
    };
};

const prevQuestion = () => {
    return function(dispatch, getState) {
        const state = getState();
        const newQuestion =
            state.questions.currQuestionIndex - 1 < 0
                ? state.questions.questions.length - 1
                : state.questions.currQuestionIndex - 1;

        dispatch(loadDatabaseOnChange(newQuestion));
    };
};

const changeCurrQuestion = id => {
    store.set('lastQuestion', id);
    return { type: types.CHANGE_QUESTION, id };
};

const changeQuestionStatus = status => ({ type: types.CHANGE_QUESTION_STATUS, status });

const changeSolvedQuestionSQL = sql => ({ type: types.CHANGE_SOLVED_QUESTION_SQL, sql });

const isLoading = payload => ({ type: types.QUESTIONS_LOADING, payload });

const loadQuestionsFromAPI = () => {
    return async function(dispatch, getState) {
        dispatch(isLoading(true));
        dispatch(isDatabaseLoading(true));
        dispatch(changeLoaderVisibility(true));
        dispatch(changeTestLoaderErrorMessage(''));

        setTimeout(
            () =>
                retryFetch(
                    async () => {
                        const { questions, lastQuestion, testTimestamp, tabs } = store.getItems([
                            'questions',
                            'lastQuestion',
                            'testTimestamp',
                            'tabs',
                        ]);

                        const testMeta = await fetch('http://localhost:8080/api/v1/tests/open/meta/').then(res =>
                            res.json(),
                        );

                        if (questions && tabs && testTimestamp === testMeta.date_changed) {
                            const dbId = questions[lastQuestion || 0].database;
                            dispatch(loadDatabaseFromAPI(dbId));

                            dispatch(setQuestions(questions));
                            dispatch(createInitialTabs(questions, tabs));
                            dispatch(changeCurrQuestion(Number(lastQuestion)));
                            dispatch(isLoading(false));

                            dispatch(addNotification('Последнее состояние восстановлено', 'info'));
                        } else {
                            const res = await fetch('http://localhost:8080/api/v1/tests/open/').then(res => res.json());

                            if (res.error) {
                                dispatch(addNotification(res.error.message, 'error'));
                            } else {
                                const dbId = res.questions[0].database;
                                dispatch(loadDatabaseFromAPI(dbId));

                                dispatch(setQuestions(res.questions));
                                dispatch(createInitialTabs(res.questions));
                                dispatch(isLoading(false));

                                store.setItems({
                                    questions: res.questions,
                                    testTimestamp: testMeta.date_changed,
                                    lastQuestion: 0,
                                    tabs: getState().tabs.tabs,
                                });
                            }
                        }
                    },
                    () => {
                        // dispatch(addNotification('Ошибка при загрузке вопросов', 'error'));
                        dispatch(
                            changeTestLoaderErrorMessage('Произошла ошибка при загрузке вопросов, попробуйте позже'),
                        );
                        dispatch(isLoading(false));
                        dispatch(isDatabaseLoading(false));
                    },
                ),
            1500,
        );
    };
};

export {
    loadQuestionsFromAPI,
    changeCurrQuestion,
    changeQuestionStatus,
    changeSolvedQuestionSQL,
    nextQuestion,
    prevQuestion,
};
