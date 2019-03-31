import * as types from '../../constants';

const initialState = {
    questions: [],
    testMeta: undefined,
    isQuestionsLoading: true,
    currQuestion: 0,
};

const questions = (state = initialState, action) => {
    switch (action.type) {
        case types.QUESTIONS_LOADED: {
            const questions = action.payload.map(q => {
                if (!q.tabs) q.tabs = [{ html: '', title: 'Tab' }];
                if (!q.currTab) q.currTab = 0;
                return q;
            });
            return {
                ...state,
                questions,
            };
        }

        case types.QUESTIONS_LOADING:
            return {
                ...state,
                isQuestionsLoading: action.payload,
            };

        case types.TEST_META_LOADED:
            return {
                ...state,
                testMeta: action.meta,
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

        case types.CREATE_NEW_TAB: {
            const questions = [...state.questions];
            questions[state.currQuestion].tabs = questions[state.currQuestion].tabs.concat([action.payload]);
            questions[state.currQuestion].currTab = questions[state.currQuestion].tabs.length - 1;

            return { ...state, questions };
        }

        case types.CHANGE_TAB: {
            const questions = [...state.questions];
            questions[state.currQuestion].currTab = action.index;

            return { ...state, questions };
        }

        case types.CHANGE_TAB_HTML: {
            const questions = [...state.questions];
            let newTabs = [...questions[state.currQuestion].tabs];
            newTabs[action.index].html = action.html;

            return { ...state, questions };
        }

        case types.CHANGE_TAB_RESPONSE: {
            const questions = [...state.questions];
            questions[state.currQuestion].tabs[action.index].response = action.response;

            return { ...state, questions };
        }

        case types.DELETE_TAB: {
            const questions = [...state.questions];

            let newCurrTab = questions[state.currQuestion].currTab;
            let newTabs = [...questions[state.currQuestion].tabs];

            newTabs.splice(newCurrTab, 1);

            if (newCurrTab > 0) newCurrTab -= 1;

            if (newTabs.length === 0) {
                newTabs = [{ html: '', title: 'Tab', response: undefined }];
            }
            questions[state.currQuestion].tabs = newTabs;
            questions[state.currQuestion].currTab = newCurrTab;

            return { ...state, questions };
        }

        default:
            return state;
    }
};

export default questions;
