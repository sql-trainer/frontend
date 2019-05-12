import * as types from '../../constants';

const initialState = {
    editorTheme: 'prism',
    isInputAreaPinned: false,
    isACAvailable: true,
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

        case types.CHANGE_AC_AVAILABILITY:
            return { ...state, isACAvailable: !state.isACAvailable };

        default:
            return state;
    }
};

export default tabs;
