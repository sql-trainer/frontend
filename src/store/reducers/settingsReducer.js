import * as types from '../../constants';

const initialState = {
    editorTheme: 'prism',
};

const tabs = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_EDITOR_THEME:
            return {
                ...state,
                editorTheme: action.theme,
            };

        default:
            return state;
    }
};

export default tabs;
