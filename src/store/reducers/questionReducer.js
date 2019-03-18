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

        default:
            return state;
    }
};

export default questions;
