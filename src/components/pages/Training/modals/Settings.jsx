import React, { useState, Fragment } from 'react';
import Modal from '../../../common/Modal';
import Select from 'react-select';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';

import Switch from '../../../common/Switch';
import classnames from 'classnames';

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
    { value: 'prism-hopscotch', label: 'Hopscotch' },
];

const createShortcutLayout = sequence => {
    return sequence.map((label, index) => (
        <Fragment key={label}>
            <div className="key">{label.toUpperCase()}</div>
            {index !== sequence.length - 1 ? '+' : ''}
        </Fragment>
    ));
};

const SettingsModal = React.memo(props => {
    const {
        visible,
        onClose,
        changeEditorTheme,
        editorTheme,
        isDetectorEnabled,
        changeShortcut,
        enableShortcutDetectorMode,
        shortcuts,
        addNotification,
        shortcutSequences,
    } = props;

    const [currShortcutLabel, setCurrShortcutLabel] = useState('');
    const [currShortcutEnv, setCurrShortcutEnv] = useState('');

    const saveShortcut = (shortcut, keysNode) => {
        const shortcutSort = [...shortcut]
            .sort()
            .join('')
            .toLowerCase();

        const find = shortcutSequences.find(
            key =>
                key
                    .map(key => key.toLowerCase())
                    .sort()
                    .join('') === shortcutSort,
        );

        if (find === undefined) {
            changeShortcut(currShortcutEnv, currShortcutLabel, shortcut);
            keysNode.classList.remove('tremble');
            return true;
        } else {
            addNotification('Такое сочетание клавиш уже занято', 'warning');
            keysNode.classList.remove('tremble');
            void keysNode.offsetWidth;
            keysNode.classList.add('tremble');
            return false;
        }
    };

    const enableShortcut = (e, label, env) => {
        enableShortcutDetectorMode(true);
        setCurrShortcutLabel(label);
        setCurrShortcutEnv(env);
    };

    const generateShortcutString = e => {
        if (!isDetectorEnabled) return false;
        e.stopPropagation();

        const keysNode = e.target.querySelector('.shortcut-keys');

        if (e.which === 27) {
            keysNode.classList.remove('tremble');
            return enableShortcutDetectorMode(false);
        }
        if (![16, 17, 18, 91].includes(e.which)) {
            const shortcutString = [];
            if (e.ctrlKey) shortcutString.push('ctrl');
            if (e.shiftKey) shortcutString.push('shift');
            if (e.altKey) shortcutString.push('alt');
            if (e.metaKey) shortcutString.push('meta');
            shortcutString.push(e.key);

            if (saveShortcut(shortcutString, keysNode)) enableShortcutDetectorMode(false);
        }
    };

    return (
        <>
            <Modal
                title="Настройки"
                opened={visible}
                poseKey="settings"
                onClose={onClose}
                maxHeight={500}
                maxWidth={600}
                fullscreenMargin={40}
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
                <div className="settings-group">
                    <div className="settings-group-title">
                        <label className="ac-switch">
                            <span>Система автодополнения</span>
                            <Switch checked={props.isACAvailable} onChange={props.changeACAvailability} />
                        </label>
                    </div>
                    Система автодополнения предлагает основные ключевые слова языка SQL, а также названия таблиц и их
                    поля.
                </div>
                <div className="settings-group">
                    <div className="settings-group-title">Сочетания клавиш</div>
                    <div>Для смены кликните на сочетание клавиш и нажмите нужную комбинацию на клавиатуре.</div>
                    <div className="shortcuts" style={{ paddingTop: '20px' }}>
                        {Object.entries(shortcuts).map((type, index) =>
                            Object.entries(type[1]).map(shortcut => (
                                <Fragment key={shortcut[0]}>
                                    <div className="shortcut-title">{shortcut[1].description}</div>
                                    <div
                                        className={classnames('shortcut', {
                                            'detector-enabled': isDetectorEnabled && shortcut[0] === currShortcutLabel,
                                        })}
                                        onClick={e => enableShortcut(e, shortcut[0], type[0])}
                                        tabIndex="-1"
                                        onKeyDown={generateShortcutString}
                                    >
                                        <div className="shortcut-keys">
                                            {createShortcutLayout(shortcut[1].sequence)}
                                        </div>
                                    </div>
                                </Fragment>
                            )),
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
});

export default SettingsModal;
