import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classNames from 'classnames';
import posed, { PoseGroup } from 'react-pose';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// imported own comopnents block
import { Header } from '../../common/';
import Logo from '../../common/Logo';
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
// import 'react-accessible-accordion/dist/fancy-example.css';

const Loader = posed.div({
    enter: { opacity: 1 },
    exit: { opacity: 0 },
});

class Training extends Component {
    state = {
        isModalHelpOpened: false,
    };

    componentDidMount() {
        const { questions, loadQuestionsFromAPI } = this.props;
        document.title = 'Training';
        document.querySelector('.app').className = 'app training-component';
        if (!questions.length) {
            loadQuestionsFromAPI();
        }
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

    render() {
        const { isInputAreaPinned, isTestLoaderVisible, testLoaderErrorMessage } = this.props;
        const { isModalHelpOpened } = this.state;

        const tabs = this.tabs;
        const currTab = this.currTab;
        const currQuestion = this.currQuestion;
        const currTabIndex = this.currTabIndex;

        return (
            <div>
                <Header style={{ minWidth: 900 }} />
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
                            <CheckButton currTabIndex={currTabIndex} currQuestion={currQuestion} currTab={currTab} />
                            <button
                                className={classNames('next-question', { active: currQuestion.status === 'solved' })}
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

                <CompletedPopup />

                <PoseGroup>
                    {isTestLoaderVisible && (
                        <Loader className="loader" key="loader">
                            <Logo animated={testLoaderErrorMessage !== ''} />
                            <div className="loader-error-message">{testLoaderErrorMessage}</div>
                        </Loader>
                    )}
                </PoseGroup>

                <Modal
                    title="Справка"
                    opened={this.state.isModalHelpOpened}
                    poseKey="help"
                    onClose={() => this.setState({ isModalHelpOpened: !this.state.isModalHelpOpened })}
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
