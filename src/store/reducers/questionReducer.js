import * as types from '../../constants';

const initialState = {
    questions: [],
    isQuestionsLoading: true,
    currQuestion: 0,
};

const questions = (state = initialState, action) => {
    switch (action.type) {
        case types.QUESTIONS_LOADED:
            return {
                ...state,
                ...action.payload,
            };

        case types.QUESTIONS_LOADING:
            return {
                ...state,
                isQuestionsLoading: action.payload,
            };

        case types.CHANGE_QUESTION:
            return {
                ...state,
                currQuestion: action.id,
            };

        case types.CHANGE_QUESTION_STATUS: {
            const questions = [...state.questions];
            questions[state.currQuestion].status = action.status;
            return {
                ...state,
                questions,
            };
        }

        case types.CHANGE_SOLVED_QUESTION_SQL: {
            const questions = [...state.questions];
            questions[state.currQuestion].sql = action.sql;
            return {
                ...state,
                questions,
            };
        }

        default:
            return state;
    }
};

export default questions;
