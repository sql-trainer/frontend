import * as types from '../../constants';
import { cloneDeep } from 'lodash';

const initialState = {
    tabs: {},
};

const tabs = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_NEW_TAB: {
            const tabs = cloneDeep(state.tabs);
            tabs[action.id].tabs = tabs[action.id].tabs.concat(action.payload);
            tabs[action.id].currTabIndex = tabs[action.id].tabs.length - 1;

            return { ...state, tabs };
        }

        case types.SQL_CHECKING: {
            const tabs = cloneDeep(state.tabs);
            tabs[action.qid].tabs[action.tid].loading = action.checking;
            return { ...state, tabs };
        }

        case types.CREATE_INITIAL_TABS: {
            let tabs = {};

            if (Object.keys(action.initialTabs).length) {
                Object.keys(action.initialTabs).forEach(key =>
                    action.initialTabs[key].tabs.map(
                        (tab, index) => delete action.initialTabs[key].tabs[index].loading,
                    ),
                );
            }

            Object.keys(action.initialTabs).length
                ? (tabs = { ...action.initialTabs })
                : action.questions.forEach(q => (tabs[q.id] = { tabs: [{ html: '', title: 'Tab' }], currTabIndex: 0 }));

            return { ...state, tabs };
        }

        case types.CHANGE_TAB: {
            const tabs = cloneDeep(state.tabs);
            tabs[action.id].currTabIndex = action.index;

            return { ...state, tabs };
        }

        case types.CHANGE_TAB_HTML: {
            const tabs = cloneDeep(state.tabs);
            tabs[action.id].tabs[action.index].html = action.html;

            return { ...state, tabs };
        }

        case types.CHANGE_SQL_RESPONSE_TYPE: {
            const tabs = cloneDeep(state.tabs);
            tabs[action.qid].tabs[action.tid].SQLResponseType = action.SQLResponseType;

            return { ...state, tabs };
        }

        case types.CHANGE_TAB_RESPONSE: {
            const tabs = cloneDeep(state.tabs);
            tabs[action.qid].tabs[action.tid].response = action.response;

            return { ...state, tabs };
        }

        case types.DELETE_TAB: {
            const tabs = cloneDeep(state.tabs);
            tabs[action.qid].tabs.splice(tabs[action.qid].currTabIndex, 1);

            if (tabs[action.qid].currTabIndex > 0)
                tabs[action.qid].currTabIndex +=
                    tabs[action.qid].currTabIndex === tabs[action.qid].tabs.length ? -1 : 0;
            else if (tabs[action.qid].tabs.length === 0) tabs[action.qid].tabs = [{ html: '', title: 'Tab' }];

            return { ...state, tabs };
        }

        default:
            return state;
    }
};

export default tabs;
