import * as types from '../../constants';

const initialState = {
    editorTheme: 'prism',
    isInputAreaPinned: false,
};

const tabs = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_EDITOR_THEME:
            return {
                ...state,
                editorTheme: action.theme,
            };

        case types.PIN_INPUT_AREA:
            return { ...state, isInputAreaPinned: !state.isInputAreaPinned };

        default:
            return state;
    }
};

export default tabs;
