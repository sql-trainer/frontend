import * as types from '../../constants';

const initialState = {
    questions: [],
    testMeta: undefined,
    isQuestionsLoading: true,
    currQuestionIndex: 0,
    isInputAreaPinned: false,
};

const questions = (state = initialState, action) => {
    switch (action.type) {
        case types.QUESTIONS_LOADED: {
            const questions = action.payload.map(q => {
                if (!q.tabs) {
                    q.tabs = [{ html: '', title: 'Tab', loading: false }];
                    q.currTabIndex = 0;
                }
                return q;
            });

            return {
                ...state,
                questions,
            };
        }

        case types.PIN_INPUT_AREA:
            return {
                ...state,
                isInputAreaPinned: !state.isInputAreaPinned,
            };

        case types.SQL_CHECKING: {
            const questions = [...state.questions];
            questions[action.question].tabs[action.tab].loading = action.checking;

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
                currQuestionIndex: action.id,
            };

        case types.CHANGE_QUESTION_STATUS: {
            const questions = [...state.questions];
            questions[state.currQuestionIndex].status = action.status;
            return {
                ...state,
                questions,
            };
        }

        case types.CHANGE_SOLVED_QUESTION_SQL: {
            const questions = [...state.questions];
            questions[state.currQuestionIndex].sql = action.sql;

            return { ...state, questions };
        }

        case types.CREATE_NEW_TAB: {
            const questions = [...state.questions];
            questions[state.currQuestionIndex].tabs = questions[state.currQuestionIndex].tabs.concat([action.payload]);
            questions[state.currQuestionIndex].currTabIndex = questions[state.currQuestionIndex].tabs.length - 1;

            return { ...state, questions };
        }

        case types.CHANGE_TAB: {
            const questions = [...state.questions];
            questions[state.currQuestionIndex].currTabIndex = action.index;

            return { ...state, questions };
        }

        case types.CHANGE_TAB_HTML: {
            const questions = [...state.questions];
            let newTabs = [...questions[state.currQuestionIndex].tabs];
            newTabs[action.index].html = action.html;

            return { ...state, questions };
        }

        case types.CHANGE_TAB_RESPONSE: {
            const questions = [...state.questions];
            questions[action.question].tabs[action.tab].response = action.response;

            return { ...state, questions };
        }

        case types.DELETE_TAB: {
            const questions = [...state.questions];

            let newCurrTab = questions[state.currQuestionIndex].currTabIndex;
            let newTabs = [...questions[state.currQuestionIndex].tabs];

            newTabs.splice(newCurrTab, 1);

            if (newCurrTab > 0) newCurrTab -= 1;

            if (newTabs.length === 0) {
                newTabs = [{ html: '', title: 'Tab', response: undefined }];
            }

            questions[state.currQuestionIndex].tabs = newTabs;
            questions[state.currQuestionIndex].currTabIndex = newCurrTab;

            return { ...state, questions };
        }

        default:
            return state;
    }
};

export default questions;
