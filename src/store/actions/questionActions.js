import * as types from '../../constants';
import { loadDatabaseFromAPI } from './databaseActions';
import { addNotification } from './notificationActions';
import { createInitialTabs } from './tabsActions';

const setQuestions = payload => ({ type: types.QUESTIONS_LOADED, payload });

const loadDatabaseOnChange = index => {
    return function(dispatch, getState) {
        const state = getState();
        console.log(state.questions.questions[index].database);
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
    return { type: types.CHANGE_QUESTION, id };
};

const changeQuestionStatus = status => ({ type: types.CHANGE_QUESTION_STATUS, status });

const changeSolvedQuestionSQL = sql => ({ type: types.CHANGE_SOLVED_QUESTION_SQL, sql });

const isLoading = payload => ({ type: types.QUESTIONS_LOADING, payload });

const changeAllQuestionsVisibility = () => ({ type: types.CHANGE_ALL_QUESTIONS_VISIBILITY });

const mergeQuestions = (questions, state) => {
    const oldQuestions = state.questions.questions;
    const oldQuestionsIDs = oldQuestions.map(q => q.id);
    const oldTabs = state.tabs.tabs;
    const newTabs = {};

    const newQuestions = questions.map(q => {
        newTabs[q.id] = oldTabs[q.id] || {
            tabs: [{ html: '', title: 'Tab' }],
            currTabIndex: 0,
            maxTabIndex: 0,
        };

        return oldQuestionsIDs.includes(q.id) ? ((q.sql = oldQuestions.find(oq => oq.id === q.id).sql), q) : q;
    });

    return { newQuestions, newTabs };
};

const loadQuestions = testID => {
    return async function(dispatch, getState) {
        const res = await fetch(`http://localhost:8080/api/v1/tests/${testID}/`).then(res => res.json());

        if (res.error) {
            dispatch(addNotification(res.error.message, 'error'));
        } else {
            const dbId = res.questions[0].database;
            dispatch(loadDatabaseFromAPI(dbId));

            const { newQuestions, newTabs } = mergeQuestions(res.questions, getState());

            dispatch(setQuestions(newQuestions));
            dispatch(createInitialTabs(newQuestions, newTabs));
            dispatch(changeCurrQuestion(0));
            dispatch(isLoading(false));
        }
    };
};

export {
    isLoading,
    setQuestions,
    changeCurrQuestion,
    changeQuestionStatus,
    changeSolvedQuestionSQL,
    nextQuestion,
    prevQuestion,
    loadQuestions,
    changeAllQuestionsVisibility,
    loadDatabaseOnChange,
};
