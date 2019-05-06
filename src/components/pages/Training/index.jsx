import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';

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
import { HelpModal, SettingsModal } from './modals';
import TrainingPH from './placeholders/TrainingPH';

// imported styles block
import './styles/index.scss';
import './styles/media.scss';

class Training extends Component {
    state = {
        isModalHelpOpened: false,
        isModalSettingsOpened: false,
    };

    componentDidMount() {
        const { loadTest, changeEditorTheme, editorTheme } = this.props;
        document.title = 'Training';
        document.querySelector('.app').className = 'app training-component';

        changeEditorTheme(editorTheme);

        loadTest('open');

        ReactTooltip.rebuild();
    }

    render() {
        const {
            isInputAreaPinned,
            changeEditorTheme,
            editorTheme,
            isTestLoaderVisible,
            testLoaderErrorMessage,
            currTab,
            currQuestion,
        } = this.props;

        const { isModalHelpOpened, isModalSettingsOpened } = this.state;

        return (
            <div>
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
                            <Questions />
                            <Database />
                        </CustomScrollbars>
                        <CustomScrollbars className="task-editor">
                            <div className={classNames('inputbox', { pinned: isInputAreaPinned })}>
                                <Tabs openHelpModal={() => this.setState({ isModalHelpOpened: !isModalHelpOpened })} />
                                <CustomScrollbars
                                    className={classNames('textarea-scrollbar', 'indicator', currTab.SQLResponseType)}
                                    prefix="editor"
                                >
                                    <SQLEditor />
                                </CustomScrollbars>
                                <CheckButton />
                                <button
                                    className={classNames('next-question', {
                                        active: currQuestion.status === 'solved',
                                    })}
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
                    onClose={() => this.setState({ isModalSettingsOpened: !isModalSettingsOpened })}
                    changeEditorTheme={changeEditorTheme}
                    editorTheme={editorTheme}
                />

                <HelpModal
                    visible={isModalHelpOpened}
                    onClose={() => this.setState({ isModalHelpOpened: !isModalHelpOpened })}
                />
            </div>
        );
    }
}

export default Training;
