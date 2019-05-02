import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classNames from 'classnames';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import Select from 'react-select';
import store from '../../../modules/store';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';

// imported own comopnents block
import { Header } from '../../common/';
import Table from './Table';
import { QuestionsContainer as Questions } from './containers/Questions';
import { DatabaseContainer as Database } from './containers/Database';
import { TabsContainer as Tabs } from './containers/Tabs';
import { CheckButtonContainer as CheckButton } from './containers/CheckButton';
import { CompletedPopupContainer as CompletedPopup } from './containers/CompletedPopup';
import { SQLEditorContainer as SQLEditor } from './containers/SQLEditor';
import Modal from '../../common/Modal';

// imported styles block
import './styles/index.scss';
import './styles/media.scss';

const Placeholder = () => (
    <div className="placeholder">
        <div className="ph-left">
            <div className="ph-block">
                <div className="ph ph-title" />
                <div className="ph ph-75" />
                <div className="ph ph-50" />
                <div className="ph-inline">
                    <div className="ph ph-25" />
                    <div className="ph ph-10" />
                </div>
            </div>
            <div className="ph-block">
                <div className="ph ph-title" />
                <div className="ph ph-25" />
                <div className="ph ph-50" />
                <div className="ph ph-25" />
            </div>
        </div>
        <div className="ph-right">
            <div className="ph-block">
                <div className="ph-inline">
                    <div className="ph ph-title" style={{ width: '80px' }} />
                    <div className="ph ph-title" style={{ width: '50px' }} />
                </div>
                <div className="ph" style={{ height: '200px' }}>
                    <div className="ph ph-circle" />
                </div>
            </div>
        </div>
    </div>
);

class Training extends Component {
    state = {
        isModalHelpOpened: false,
        isModalSettingsOpened: false,
    };

    componentDidMount() {
        const { questions, loadTest, changeEditorTheme, editorTheme } = this.props;
        document.title = 'Training';
        document.querySelector('.app').className = 'app training-component';

        changeEditorTheme(editorTheme);

        // if (!questions.length)
        loadTest('open');

        ReactTooltip.rebuild();
    }

    get tabs() {
        return (
            (this.props.tabs[this.currQuestion.id] || {})['tabs'] || [{ html: '', title: 'Tab', response: undefined }]
        );
    }

    get currTab() {
        return this.tabs[this.currTabIndex];
    }

    get currTabIndex() {
        return (this.props.tabs[this.currQuestion.id] || {}).currTabIndex || 0;
    }

    get currQuestion() {
        const { questions, currQuestionIndex } = this.props;
        return questions.length ? questions[currQuestionIndex] : {};
    }

    highlightPreviewSQL() {
        return {
            __html: Prism.highlight(
                `SELECT * FROM permissions AS prm WHERE id=(SELECT id FROM users WHERE name='Vasya')`,
                Prism.languages.sql,
            ),
        };
    }

    selectTheme = theme => {
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

    appThemes = [{ value: 'light', label: 'Светлая' }, { value: 'dark', label: 'Тёмная' }];

    editorThemes = [
        { value: 'prism', label: 'Prism' },
        { value: 'prism-dark', label: 'Dark' },
        { value: 'prism-funky', label: 'Funky' },
        { value: 'prism-okaidia', label: 'Okaidia' },
        { value: 'prism-twilight', label: 'Twilight' },
        { value: 'prism-coy', label: 'Coy' },
        { value: 'prism-solarizedlight', label: 'Solarized light' },
        { value: 'prism-tomorrow', label: 'Tomorrow night' },
    ];

    render() {
        const { isInputAreaPinned, changeEditorTheme, editorTheme, isTestLoaderVisible } = this.props;
        const { isModalHelpOpened, isModalSettingsOpened } = this.state;

        const tabs = this.tabs;
        const currTab = this.currTab;
        const currQuestion = this.currQuestion;
        const currTabIndex = this.currTabIndex;

        return (
            <div>
                <Header
                    style={{ minWidth: 900 }}
                    openSettingsModal={() => this.setState({ isModalSettingsOpened: !isModalSettingsOpened })}
                />
                {isTestLoaderVisible ? (
                    <Placeholder />
                ) : (
                    <section className="training">
                        <PerfectScrollbar className="task-info">
                            <Questions currQuestion={currQuestion} />
                            <Database />
                        </PerfectScrollbar>
                        <PerfectScrollbar className="task-editor">
                            <div className={classNames('inputbox', { pinned: isInputAreaPinned })}>
                                <Tabs
                                    tabs={tabs}
                                    currTabIndex={currTabIndex}
                                    openHelpModal={() => this.setState({ isModalHelpOpened: !isModalHelpOpened })}
                                />
                                <PerfectScrollbar
                                    className={classNames('textarea-scrollbar', 'indicator', currTab.SQLResponseType)}
                                >
                                    <SQLEditor currTab={currTab} currTabIndex={currTabIndex} />
                                </PerfectScrollbar>
                                <CheckButton
                                    currTabIndex={currTabIndex}
                                    currQuestion={currQuestion}
                                    currTab={currTab}
                                />
                                <button
                                    className={classNames('next-question', {
                                        active: currQuestion.status === 'solved',
                                    })}
                                    onClick={this.props.nextQuestion}
                                    data-tip="Следующий вопрос"
                                />
                            </div>
                            <div className={classNames('resultbox', { checking: currTab.loading })}>
                                {currTab.response ? (
                                    <Table
                                        className={classNames('response-table', { pinned: isInputAreaPinned })}
                                        fields={currTab.response.fields}
                                        rows={currTab.response.rows}
                                    />
                                ) : null}
                            </div>
                        </PerfectScrollbar>
                    </section>
                )}

                <CompletedPopup />

                <Modal
                    title="Настройки"
                    opened={isModalSettingsOpened}
                    poseKey="settings"
                    onClose={() => this.setState({ isModalSettingsOpened: !isModalSettingsOpened })}
                    maxHeight={500}
                    maxWidth={600}
                >
                    <div className="settings-group">
                        <div className="settings-group-title">Цветовая схема редактора</div>
                        <Select
                            options={this.editorThemes}
                            defaultValue={
                                this.editorThemes[this.editorThemes.findIndex(theme => theme.value === editorTheme)]
                            }
                            placeholder="Выберите цветовую схему"
                            theme={this.selectTheme}
                            onChange={theme => {
                                changeEditorTheme(theme.value);
                            }}
                        />
                        <div
                            className={`editor-theme-preview  ${editorTheme}`}
                            dangerouslySetInnerHTML={this.highlightPreviewSQL()}
                        />
                    </div>

                    <div className="settings-group">
                        <div className="settings-group-title">Основная тема приложения</div>
                        <Select
                            options={this.appThemes}
                            defaultValue={this.appThemes[0]}
                            placeholder="Выберите тему"
                            theme={this.selectTheme}
                        />
                    </div>
                </Modal>

                <Modal
                    title="Справка"
                    opened={isModalHelpOpened}
                    poseKey="help"
                    onClose={() => this.setState({ isModalHelpOpened: !isModalHelpOpened })}
                    maxHeight={500}
                    maxWidth={600}
                >
                    <Accordion allowZeroExpanded>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>Какие сочетания клавиш есть у редактора?</AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <ul>
                                    <li>
                                        <b>F9</b> - запустить проверку запроса
                                    </li>
                                    <li>
                                        <b>F9</b> - запустить проверку запроса
                                    </li>
                                    <li>
                                        <b>F9</b> - запустить проверку запроса
                                    </li>
                                    <li>
                                        <b>F9</b> - запустить проверку запроса
                                    </li>
                                    <li>
                                        <b>F9</b> - запустить проверку запроса
                                    </li>
                                </ul>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    Какая СУБД используется для проверки запросов?
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <p>Для проверки ваших запросов используется СУБД MySQL 8.0.</p>
                            </AccordionItemPanel>
                        </AccordionItem>
                    </Accordion>
                </Modal>
            </div>
        );
    }
}

export default Training;
