import * as types from '../../constants';

const initialState = {
    questions: [],
    testMeta: undefined,
    isQuestionsLoading: true,
    currQuestionIndex: 0,
    isInputAreaPinned: false,
};

const map = (obj, type) => (obj[type] ? obj[type]() : undefined);

const questions = (state = initialState, action) => {
    const obj = {
        [types.QUESTIONS_LOADED]: () => ({ ...state, questions: action.payload }),
        [types.PIN_INPUT_AREA]: () => ({ ...state, isInputAreaPinned: !state.isInputAreaPinned }),
        [types.QUESTIONS_LOADING]: () => ({ ...state, isQuestionsLoading: action.payload }),
        [types.TEST_META_LOADED]: () => ({ ...state, testMeta: action.meta }),
        [types.CHANGE_QUESTION]: () => ({ ...state, currQuestionIndex: action.id }),
        [types.CHANGE_SOLVED_QUESTION_SQL]: () => {
            const questions = [...state.questions];
            questions[state.currQuestionIndex].sql = action.sql;
            return { ...state, questions };
        },
        [types.CHANGE_QUESTION_STATUS]: () => {
            const questions = [...state.questions];
            questions[state.currQuestionIndex].status = action.status;
            return { ...state, questions };
        },
    };

    return map(obj, action.type) || { ...state };

    // switch (action.type) {
    //     case types.QUESTIONS_LOADED: {
    //         return { ...state, questions: action.payload };
    //     }

    //     case types.PIN_INPUT_AREA:
    //         return { ...state, isInputAreaPinned: !state.isInputAreaPinned };

    //     case types.SQL_CHECKING: {
    //         const questions = [...state.questions];
    //         questions[action.question].tabs[action.tab].loading = action.checking;

    //         return { ...state, questions };
    //     }

    //     case types.QUESTIONS_LOADING:
    //         return { ...state, isQuestionsLoading: action.payload };

    //     case types.TEST_META_LOADED:
    //         return { ...state, testMeta: action.meta };

    //     case types.CHANGE_QUESTION:
    //         return { ...state, currQuestionIndex: action.id };

    //     case types.CHANGE_QUESTION_STATUS: {
    //         const questions = [...state.questions];
    //         questions[state.currQuestionIndex].status = action.status;
    //         return { ...state, questions };
    //     }

    //     case types.CHANGE_SOLVED_QUESTION_SQL: {
    //         const questions = [...state.questions];
    //         questions[state.currQuestionIndex].sql = action.sql;

    //         return { ...state, questions };
    //     }

    //     default:
    //         return state;
    // }
};

export default questions;
