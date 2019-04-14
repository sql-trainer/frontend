import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classNames from 'classnames';
import posed, { PoseGroup } from 'react-pose';

import { Header } from '../../common';
import Table from './Table';
import { QuestionsContainer as Questions } from './containers/Questions';
import { DatabaseContainer as Database } from './containers/Database';
import { TabsContainer as Tabs } from './containers/Tabs';
import { CheckButtonContainer as CheckButton } from './containers/CheckButton';
import { CompletedPopupContainer as CompletedPopup } from './containers/CompletedPopup';
import { SQLEditorContainer as SQLEditor } from './containers/SQLEditor';

import './styles/index.scss';
import './styles/media.scss';

const Loader = posed.div({
    enter: { opacity: 1 },
    exit: { opacity: 0 },
});

class Training extends Component {
    componentDidMount() {
        const { questions, loadQuestionsFromAPI } = this.props;
        document.title = 'Training';
        document.querySelector('.app').className = 'app training-component';
        if (!questions.length) {
            loadQuestionsFromAPI();
        }
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
        const { isInputAreaPinned, isTestLoaderVisible } = this.props;

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
                            <Tabs tabs={tabs} currTabIndex={currTabIndex} />
                            <PerfectScrollbar className="textarea-scrollbar">
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
                            <div className="logo">
                                <div className="logo__quarter" />
                                <div className="logo__quarter" />
                                <div className="logo__quarter" />
                                <div className="logo__quarter" />
                            </div>
                        </Loader>
                    )}
                </PoseGroup>
            </div>
        );
    }
}

export default Training;
