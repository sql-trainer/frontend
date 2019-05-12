import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';
import { HotKeys } from 'react-hotkeys';

// imported own comopnents block
import CustomScrollbars from './CustomScrollbars';
import { Header } from '../../common/';
import Table from './Table';
import { QuestionsContainer as Questions } from './containers/Questions';
import { AllQuestionsContainer as AllQuestions } from './containers/AllQuestions';
import { DatabaseContainer as Database } from './containers/Database';
import { TabsContainer as Tabs } from './containers/Tabs';
import { CheckButtonContainer as CheckButton } from './containers/CheckButton';
import { CompletedPopupContainer as CompletedPopup } from './containers/CompletedPopup';
import { SQLEditorContainer as SQLEditor } from './containers/SQLEditor';
import { HelpModal, SettingsModal, StatisticsModal } from './modals';
import TrainingPH from './placeholders/TrainingPH';

// imported styles block
import './styles/index.scss';
import './styles/media.scss';

class Training extends Component {
    state = {
        isModalHelpOpened: false,
        isModalSettingsOpened: false,
        isModalStatOpened: false,
    };

    componentDidMount() {
        const { loadTest, changeEditorTheme, editorTheme } = this.props;
        document.title = 'Training';
        document.querySelector('.app').className = 'app training-component';

        changeEditorTheme(editorTheme);

        loadTest('open');

        ReactTooltip.rebuild();
    }

    editorKeys = {
        CHECK: 'f9',
        NEXT_TAB: 'ctrl+alt+right',
        PREVIOUS_TAB: 'ctrl+alt+left',
        CREATE_TAB: 'shift+alt+n',
        DELETE_TAB: 'shift+alt+d',
    };

    editorHandlers = () => {
        const {
            checkSQL,
            nextTab,
            prevTab,
            createNewTab,
            deleteTab,
            questions,
            currTab,
            currQuestion,
            currTabIndex,
            currQuestionIndex,
        } = this.props;

        const disabled = !questions.length || currTab.loading || !currTab.html;

        return {
            CHECK: event => !disabled && checkSQL(currQuestionIndex, currTabIndex),
            NEXT_TAB: () => nextTab(currQuestion.id),
            PREVIOUS_TAB: () => prevTab(currQuestion.id),
            CREATE_TAB: () => createNewTab(currQuestion.id),
            DELETE_TAB: () => deleteTab(currQuestion.id),
        };
    };

    questionKeys = {
        NEXT_QUESTION: 'ctrl+alt+]',
        PREVIOUS_QUESTION: 'ctrl+alt+[',
    };

    questionHandlers = () => {
        const { nextQuestion, prevQuestion } = this.props;

        return {
            NEXT_QUESTION: () => nextQuestion(),
            PREVIOUS_QUESTION: () => prevQuestion(),
        };
    };

    render() {
        const {
            isInputAreaPinned,
            changeEditorTheme,
            editorTheme,
            isTestLoaderVisible,
            testLoaderErrorMessage,
            currTab,
            currQuestion,
            changeACAvailability,
            isACAvailable,
            questions,
        } = this.props;

        const { isModalHelpOpened, isModalSettingsOpened, isModalStatOpened } = this.state;

        return (
            <HotKeys keyMap={this.questionKeys} handlers={this.questionHandlers()} focused>
                <Header
                    style={{ minWidth: 900 }}
                    openSettingsModal={() => this.setState({ isModalSettingsOpened: !isModalSettingsOpened })}
                />
                {isTestLoaderVisible ? (
                    <>
                        <div className="test-loader-error">{testLoaderErrorMessage}</div>
                        <TrainingPH />
                    </>
                ) : (
                    <section className="training">
                        <CustomScrollbars className="task-info">
                            <Questions openStatModal={() => this.setState({ isModalStatOpened: !isModalStatOpened })} />
                            <Database />
                        </CustomScrollbars>
                        <CustomScrollbars className="task-editor">
                            <HotKeys
                                keyMap={this.editorKeys}
                                handlers={this.editorHandlers()}
                                className={classNames('inputbox', { pinned: isInputAreaPinned })}
                            >
                                <Tabs openHelpModal={() => this.setState({ isModalHelpOpened: !isModalHelpOpened })} />
                                <SQLEditor />
                                <CheckButton />
                                <button
                                    className={classNames('next-question', {
                                        active: currQuestion.status === 'solved',
                                    })}
                                    onClick={this.props.nextQuestion}
                                    data-tip="Следующий вопрос"
                                />
                            </HotKeys>

                            {currTab.response && (
                                <div className={classNames('resultbox', { checking: currTab.loading })}>
                                    <Table
                                        className={classNames('response-table', { pinned: isInputAreaPinned })}
                                        fields={currTab.response.fields}
                                        rows={currTab.response.rows}
                                    />
                                </div>
                            )}
                        </CustomScrollbars>
                    </section>
                )}

                <AllQuestions />

                <CompletedPopup />

                <SettingsModal
                    visible={isModalSettingsOpened}
                    onClose={() => this.setState({ isModalSettingsOpened: !isModalSettingsOpened })}
                    changeEditorTheme={changeEditorTheme}
                    editorTheme={editorTheme}
                    changeACAvailability={changeACAvailability}
                    isACAvailable={isACAvailable}
                />

                <StatisticsModal
                    visible={isModalStatOpened}
                    editorTheme={editorTheme}
                    questions={questions}
                    onClose={() => this.setState({ isModalStatOpened: !isModalStatOpened })}
                />

                <HelpModal
                    visible={isModalHelpOpened}
                    onClose={() => this.setState({ isModalHelpOpened: !isModalHelpOpened })}
                />
            </HotKeys>
        );
    }
}

export default Training;
