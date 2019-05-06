import React from 'react';
import Modal from '../../../common/Modal';
import Select from 'react-select';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';

const SettingsModal = props => {
    const { visible, onClose, changeEditorTheme, editorTheme } = props;

    const highlightPreviewSQL = () => {
        return {
            __html: Prism.highlight(
                `SELECT * FROM permissions AS prm WHERE id=(SELECT id FROM users WHERE name='Vasya')`,
                Prism.languages.sql,
            ),
        };
    };

    const selectTheme = theme => {
        return {
            ...theme,
            borderRadius: 4,
            colors: {
                ...theme.colors,
                primary25: '#f4f1fa',
                primary: '#8255ca',
            },
        };
    };

    const appThemes = [{ value: 'light', label: 'Светлая' }, { value: 'dark', label: 'Тёмная' }];

    const editorThemes = [
        { value: 'prism', label: 'Prism' },
        { value: 'prism-dark', label: 'Dark' },
        { value: 'prism-funky', label: 'Funky' },
        { value: 'prism-okaidia', label: 'Okaidia' },
        { value: 'prism-twilight', label: 'Twilight' },
        { value: 'prism-coy', label: 'Coy' },
        { value: 'prism-solarizedlight', label: 'Solarized light' },
        { value: 'prism-tomorrow', label: 'Tomorrow night' },
    ];

    return (
        <Modal
            title="Настройки"
            opened={visible}
            poseKey="settings"
            onClose={onClose}
            maxHeight={500}
            maxWidth={600}
            animation="fade"
            fullscreen
        >
            <div className="settings-group">
                <div className="settings-group-title">Цветовая схема редактора</div>
                <Select
                    options={editorThemes}
                    defaultValue={editorThemes[editorThemes.findIndex(theme => theme.value === editorTheme)]}
                    placeholder="Выберите цветовую схему"
                    theme={selectTheme}
                    onChange={theme => {
                        changeEditorTheme(theme.value);
                    }}
                />
                <div
                    className={`editor-theme-preview  ${editorTheme}`}
                    dangerouslySetInnerHTML={highlightPreviewSQL()}
                />
            </div>

            <div className="settings-group">
                <div className="settings-group-title">Основная тема приложения</div>
                <Select
                    options={appThemes}
                    defaultValue={appThemes[0]}
                    placeholder="Выберите тему"
                    theme={selectTheme}
                />
            </div>
        </Modal>
    );
};

export default SettingsModal;