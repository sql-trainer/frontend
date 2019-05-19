import * as types from '../../constants';

const setEditorTheme = theme => {
    return { type: types.CHANGE_EDITOR_THEME, theme };
};

const changeShortcut = (shortcutType, shortcutName, combination) => {
    return { type: types.CHANGE_SHORTCUT, shortcutType, shortcutName, combination };
};

const enableShortcutDetectorMode = enable => {
    return { type: types.ENABLE_DETECTOR, enable };
};

const pinInputArea = () => ({ type: types.PIN_INPUT_AREA });

const changeACAvailability = () => ({ type: types.CHANGE_AC_AVAILABILITY });

const changeEditorTheme = theme => {
    return async function(dispatch, getState) {
        const editorThemes = [
            'prism',
            'prism-dark',
            'prism-funky',
            'prism-okaidia',
            'prism-twilight',
            'prism-coy',
            'prism-solarizedlight',
            'prism-tomorrow',
            'prism-hopscotch',
        ];

        theme = editorThemes.includes(theme) ? theme : 'prism';

        import(`../../styles/themes/${theme}.scss`).then(() => {
            dispatch(setEditorTheme(theme));
        });
    };
};

export { changeEditorTheme, pinInputArea, changeACAvailability, changeShortcut, enableShortcutDetectorMode };
