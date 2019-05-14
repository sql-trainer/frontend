import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';
import { GlobalHotKeys } from 'react-hotkeys';
import { configure } from 'react-hotkeys';
import debounce from 'lodash.debounce';

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

configure({
    ignoreEventsCondition: event => {
        const { target } = event;

        if (target && target.tagName === 'TEXTAREA') {
            return event.which === 191 && event.shiftKey;
        } else {
            return false;
        }
    },
});

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

    nextTab = e => this.props.nextTab(this.props.currQuestion.id);

    prevTab = () => this.props.prevTab(this.props.currQuestion.id);

    createNewTab = debounce(() => this.props.createNewTab(this.props.currQuestion.id), 50);

    deleteTab = debounce(() => this.props.deleteTab(this.props.currQuestion.id), 50);

    checkSQL = () => {
        const { questions, currTab, currQuestionIndex, checkSQL, currTabIndex } = this.props;
        const disabled = !questions.length || currTab.loading || !currTab.html;
        return !disabled && checkSQL(currQuestionIndex, currTabIndex);
    };

    globalKeys = {
        NEXT_QUESTION: 'Control+Alt+]',
        PREVIOUS_QUESTION: 'Control+Alt+[',
        TEST_STAT: 'Shift+?',
        CHECK: 'F9',
        NEXT_TAB: 'Control+Alt+ArrowRight',
        PREVIOUS_TAB: 'Control+Alt+ArrowLeft',
        CREATE_TAB: 'Shift+Alt+N',
        DELETE_TAB: 'Shift+Alt+D',
    };

    globalHandlers = () => {
        const { nextQuestion, prevQuestion } = this.props;

        return {
            NEXT_QUESTION: () => nextQuestion(),
            PREVIOUS_QUESTION: () => prevQuestion(),
            TEST_STAT: () => this.setState({ isModalStatOpened: !this.state.isModalStatOpened }),
            CHECK: this.checkSQL,
            NEXT_TAB: this.nextTab,
            PREVIOUS_TAB: this.prevTab,
            CREATE_TAB: this.createNewTab,
            DELETE_TAB: this.deleteTab,
        };
    };

    openSettingsModal = () => this.setState({ isModalSettingsOpened: !this.state.isModalSettingsOpened });
    openStatModal = () => this.setState({ isModalStatOpened: !this.state.isModalStatOpened });
    openHelpModal = () => this.setState({ isModalHelpOpened: !this.state.isModalHelpOpened });

    render() {
        const {
            isInputAreaPinned,
            changeEditorTheme,
            editorTheme,
            isTestLoaderVisible,
            testLoaderErrorMessage,
            currTab,
            changeACAvailability,
            isACAvailable,
        } = this.props;

        const { isModalHelpOpened, isModalSettingsOpened, isModalStatOpened } = this.state;

        return (
            <>
                <GlobalHotKeys keyMap={this.globalKeys} handlers={this.globalHandlers()} />
                <Header style={{ minWidth: 900 }} openSettingsModal={this.openSettingsModal} />
                {isTestLoaderVisible ? (
                    <>
                        <div className="test-loader-error">{testLoaderErrorMessage}</div>
                        <TrainingPH />
                    </>
                ) : (
                    <section className="training">
                        <CustomScrollbars className="task-info" key="leftside">
                            <Questions openStatModal={this.openStatModal} />
                            <Database key="database" />
                        </CustomScrollbars>
                        <CustomScrollbars className="task-editor">
                            <div className={classNames('inputbox', { pinned: isInputAreaPinned })}>
                                <Tabs openHelpModal={this.openHelpModal} />
                                <SQLEditor />
                                <CheckButton />
                                <button
                                    className="next-question"
                                    onClick={this.props.nextQuestion}
                                    data-tip="Следующий вопрос"
                                />
                            </div>
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
                    onClose={this.openSettingsModal}
                    changeEditorTheme={changeEditorTheme}
                    editorTheme={editorTheme}
                    changeACAvailability={changeACAvailability}
                    isACAvailable={isACAvailable}
                />

                <StatisticsModal visible={isModalStatOpened} onClose={this.openStatModal} />

                <HelpModal visible={isModalHelpOpened} onClose={this.openHelpModal} />
            </>
        );
    }
}

export default Training;
