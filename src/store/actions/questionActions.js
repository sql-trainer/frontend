import * as types from '../../constants';
import { loadDatabaseFromAPI, isLoading as isDatabaseLoading } from './databaseActions';
import { addNotification } from './notificationActions';
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

const isChecking = ({ question, tab, checking }) => ({ type: types.SQL_CHECKING, question, tab, checking });

const loadQuestionsFromAPI = () => {
    return async function(dispatch) {
        dispatch(isLoading(true));
        dispatch(isDatabaseLoading(true));

        retryFetch(
            async () => {
                const { questions, lastQuestion, testTimestamp } = store.getItems([
                    'questions',
                    'lastQuestion',
                    'testTimestamp',
                ]);

                const testMeta = await fetch('http://localhost:8080/api/v1/tests/open/meta/').then(res => res.json());

                if (questions && testTimestamp === testMeta.date_changed) {
                    const dbId = questions[lastQuestion || 0].database;
                    dispatch(setQuestions(questions));
                    dispatch(changeCurrQuestion(Number(lastQuestion)));
                    dispatch(isLoading(false));
                    dispatch(loadDatabaseFromAPI(dbId));

                    dispatch(addNotification('Последнее состояние восстановлено', 'info'));
                } else {
                    const res = await fetch('http://localhost:8080/api/v1/tests/open/').then(res => res.json());

                    if (res.error) {
                        dispatch(addNotification(res.error.message, 'error'));
                    } else {
                        const dbId = res.questions[0].database;
                        dispatch(setQuestions(res.questions));
                        dispatch(isLoading(false));
                        dispatch(loadDatabaseFromAPI(dbId));

                        store.setItems({
                            questions: res.questions,
                            testTimestamp: testMeta.date_changed,
                            lastQuestion: 0,
                        });
                    }
                }
            },
            () => {
                dispatch(addNotification('Ошибка при загрузке вопросов', 'error'));
                dispatch(isLoading(false));
                dispatch(isDatabaseLoading(false));
            },
        );
    };
};

export {
    loadQuestionsFromAPI,
    changeCurrQuestion,
    changeQuestionStatus,
    changeSolvedQuestionSQL,
    isChecking,
    nextQuestion,
    prevQuestion,
};
