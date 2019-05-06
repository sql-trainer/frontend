import * as types from '../../constants';
import { REHYDRATE } from 'redux-persist';

const initialState = {
    questions: [],
    isQuestionsLoading: true,
    currQuestionIndex: 0,
    isAllQOpen: false,
};

const questions = (state = initialState, action) => {
    switch (action.type) {
        case REHYDRATE: {
            if (action.key === 'test-questions' && action.payload) {
                return {
                    ...state,
                    questions: action.payload.questions,
                    currQuestionIndex: action.payload.currQuestionIndex,
                };
            } else return { ...state };
        }

        case types.QUESTIONS_LOADED: {
            return { ...state, questions: action.payload };
        }

        case types.CHANGE_ALL_QUESTIONS_VISIBILITY:
            return { ...state, isAllQOpen: !state.isAllQOpen };

        case types.QUESTIONS_LOADING:
            return { ...state, isQuestionsLoading: action.payload };

        case types.TEST_META_LOADED:
            return { ...state, testMeta: action.meta };

        case types.CHANGE_QUESTION:
            return { ...state, currQuestionIndex: action.id };

        case types.CHANGE_QUESTION_STATUS: {
            const questions = [...state.questions];
            questions[state.currQuestionIndex].status = action.status;
            return { ...state, questions };
        }

        case types.CHANGE_SOLVED_QUESTION_SQL: {
            const questions = [...state.questions];
            questions[state.currQuestionIndex].sql = action.sql;

            return { ...state, questions };
        }

        default:
            return state;
    }
};

export default questions;
