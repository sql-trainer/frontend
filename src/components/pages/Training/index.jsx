import React from 'react';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';
import { HotKeys } from 'react-hotkeys';
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
    // logLevel: 'debug',
    ignoreEventsCondition: event => false,
});

class Training extends React.PureComponent {
    sRef = React.createRef();
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

    prevTab = e => this.props.prevTab(this.props.currQuestion.id);

    createNewTab = debounce(e => this.props.createNewTab(this.props.currQuestion.id), 50);

    deleteTab = debounce(e => this.props.deleteTab(this.props.currQuestion.id), 50);

    checkSQL = e => {
        const { questions, currTab, currQuestionIndex, checkSQL, currTabIndex } = this.props;
        const disabled = !questions.length || currTab.loading || !currTab.html;
        return !disabled && checkSQL(currQuestionIndex, currTabIndex);
    };

    globalHandlers = () => {
        const { nextQuestion, prevQuestion } = this.props;

        return {
            NEXT_QUESTION: e => nextQuestion(),
            PREVIOUS_QUESTION: e => prevQuestion(),
            TEST_STAT: e => this.setState({ isModalStatOpened: !this.state.isModalStatOpened }),
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
        const { isInputAreaPinned, isTestLoaderVisible, testLoaderErrorMessage, currTab, globalKeyMap } = this.props;
        const { isModalHelpOpened, isModalSettingsOpened, isModalStatOpened } = this.state;

        return (
            <>
                <Header openSettingsModal={this.openSettingsModal} />
                {isTestLoaderVisible ? (
                    <>
                        <div className="test-loader-error">{testLoaderErrorMessage}</div>
                        <TrainingPH />
                    </>
                ) : (
                    <HotKeys
                        keyMap={globalKeyMap}
                        handlers={this.globalHandlers()}
                        allowChanges={true}
                        component={'section'}
                        className="training"
                    >
                        <CustomScrollbars className="task-info" ref={this.sRef}>
                            <Questions openStatModal={this.openStatModal} />
                            <Database scrollRef={this.sRef} />
                        </CustomScrollbars>
                        <CustomScrollbars className="task-editor">
                            <div className={classNames('inputbox', { pinned: isInputAreaPinned })}>
                                <Tabs openHelpModal={this.openHelpModal} />
                                <SQLEditor />
                                <CheckButton />
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
                    </HotKeys>
                )}

                <AllQuestions />

                <CompletedPopup />

                <SettingsModal visible={isModalSettingsOpened} onClose={this.openSettingsModal} />

                <StatisticsModal visible={isModalStatOpened} onClose={this.openStatModal} />

                <HelpModal visible={isModalHelpOpened} onClose={this.openHelpModal} />
            </>
        );
    }
}

export default Training;
