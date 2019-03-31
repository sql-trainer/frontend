import * as types from '../../constants';

const initialState = {
    currTab: 0,
    tabs: [],
};

const tabs = (state = initialState, action) => {
    console.log(state);
    switch (action.type) {
        case types.CREATE_NEW_TAB:
            return {
                ...state,
                tabs: state.tabs.concat([action.payload]),
                currTab: state.tabs.length,
            };

        case types.CHANGE_TAB:
            return {
                ...state,
                currTab: action.index,
            };

        case types.CHANGE_TAB_HTML: {
            let newTabs = state.tabs.map(tab => tab);
            newTabs[action.index].html = action.html;

            return {
                ...state,
                tabs: newTabs,
            };
        }

        case types.DELETE_ALL_TABS:
            return {
                ...state,
                tabs: [
                    {
                        html: action.html,
                        title: 'Tab',
                        response: undefined,
                    },
                ],
                currTab: 0,
            };

        case types.CHANGE_TAB_RESPONSE: {
            let newTabs = [...state.tabs];
            try {
                newTabs[action.index].response = action.response;
                return {
                    ...state,
                    tabs: newTabs,
                };
            } catch (e) {
                return {
                    ...state,
                };
            }
        }

        case types.DELETE_TAB:
            let newCurrTab = state.currTab;
            let newTabs = state.tabs.map(tab => tab);

            newTabs.splice(state.currTab, 1);

            if (state.currTab > 0) newCurrTab -= 1;

            if (newTabs.length === 0) {
                newTabs = [
                    {
                        html: '',
                        title: 'Tab',
                        response: undefined,
                    },
                ];
            }

            return {
                ...state,
                tabs: newTabs,
                currTab: newCurrTab,
            };

        default:
            return state;
    }
};

export default tabs;
