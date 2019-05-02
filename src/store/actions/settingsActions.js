import * as types from '../../constants';
import store from '../../modules/store';

const setEditorTheme = theme => {
    return { type: types.CHANGE_EDITOR_THEME, theme };
};

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
        ];

        theme = editorThemes.includes(theme) ? theme : 'prism';

        // store.set('editorTheme', theme);

        import(`../../styles/themes/${theme}.scss`).then(() => {
            dispatch(setEditorTheme(theme));
        });
    };
};

export { changeEditorTheme };
