import * as types from '../../constants';
import cloneDeep from 'lodash.clonedeep';

const initialState = {
    editorTheme: 'prism',
    isInputAreaPinned: false,
    isACAvailable: true,
    shortcuts: {
        global: {
            NEXT_QUESTION: { sequence: ['Ctrl', 'Alt', ']'], description: 'Следующий вопрос' },
            PREVIOUS_QUESTION: { sequence: ['Ctrl', 'Alt', '['], description: 'Предыдущий вопрос' },
            TEST_STAT: { sequence: ['Ctrl', 'Shift', '?'], description: 'Вызвать статистику по тесту' },
            CHECK: { sequence: ['F9'], description: 'Запустить проверку запроса' },
            NEXT_TAB: { sequence: ['Ctrl', 'Alt', 'ArrowRight'], description: 'Следующая вкладка' },
            PREVIOUS_TAB: { sequence: ['Ctrl', 'Alt', 'ArrowLeft'], description: 'Предыдущая вкладка' },
            CREATE_TAB: { sequence: ['Shift', 'Alt', 'N'], description: 'Создать новую вкладку' },
            DELETE_TAB: { sequence: ['Shift', 'Alt', 'D'], description: 'Удалить текущую вкладку' },
        },
    },
    // globalKeys: [
    //     { label: 'NEXT_QUESTION', string: 'Ctrl+Alt+]', description: 'Следующий вопрос' },
    //     { label: 'PREVIOUS_QUESTION', string: 'Ctrl+Alt+[', description: 'Предыдущий вопрос' },
    //     { label: 'TEST_STAT', string: 'Ctrl+Shift+?', description: 'Вызвать статистику по тесту' },
    //     { label: 'CHECK', string: 'F9', description: 'Запустить проверку запроса' },
    //     { label: 'NEXT_TAB', string: 'Ctrl+Alt+arrowRight', description: 'Следующая вкладка' },
    //     { label: 'PREVIOUS_TAB', string: 'Ctrl+Alt+arrowLeft', description: 'Предыдущая вкладка' },
    //     { label: 'CREATE_TAB', string: 'Shift+Alt+N', description: 'Создать новую вкладку' },
    //     { label: 'DELETE_TAB', string: 'Shift+Alt+D', description: 'Удалить текущую вкладку' },
    // ],
    isDetectorEnabled: false,
};

const tabs = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_EDITOR_THEME:
            return {
                ...state,
                editorTheme: action.theme,
            };

        case types.CHANGE_SHORTCUT:
            const shortcuts = cloneDeep(state.shortcuts);
            shortcuts[action.shortcutType][action.shortcutName].sequence = action.combination;

            return { ...state, shortcuts };

        case types.ENABLE_DETECTOR:
            return {
                ...state,
                isDetectorEnabled: action.enable,
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
