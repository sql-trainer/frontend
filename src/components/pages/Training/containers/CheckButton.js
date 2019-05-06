import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTableActivity } from '../../../../store/actions/databaseActions';
import { changeQuestionStatus, changeSolvedQuestionSQL } from '../../../../store/actions/questionActions';
import { changeTabResponse, isChecking, changeSQLResponseType } from '../../../../store/actions/tabsActions';
import { changePopupVisibility, changeTestStatus } from '../../../../store/actions/testActions';
import { addNotification } from '../../../../store/actions/notificationActions';
import * as selectors from '../../../../store/selectors';

import CheckButton from '../CheckButton';

class CheckButtonC extends Component {
    checkSQL = e => {
        const {
            changeTabResponse,
            changeQuestionStatus,
            changeSolvedQuestionSQL,
            changeSQLResponseType,
            changePopupVisibility,
            currTabIndex,
            isChecking,
            addNotification,
            isTestCompleted,
            currTab,
            currQuestion,
        } = this.props;

        const sql = currTab.html;

        let responseType = 'error';

        isChecking(currQuestion.id, currTabIndex, true);

        setTimeout(() => {
            fetch(`http://localhost:8080/api/v1/tests/open/questions/${currQuestion.id}/check`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sql }),
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        addNotification(res.error.message, 'error');
                    } else {
                        if (res.success) {
                            if (currQuestion.status !== 'solved') changeQuestionStatus('solved');
                            changeSolvedQuestionSQL(sql);
                            responseType = 'success';
                        }

                        changeTabResponse(currQuestion.id, currTabIndex, { fields: res.fields, rows: res.rows });
                        if (!isTestCompleted && this.checkTestResult()) changePopupVisibility();
                    }
                })
                .catch(err => addNotification('Ошибка сервера', 'error'))
                .finally(() => {
                    isChecking(currQuestion.id, currTabIndex, false);
                    changeSQLResponseType(responseType, currTabIndex, currQuestion.id);
                });
        }, 1000);
    };

    checkTestResult = () => {
        const { questions } = this.props;
        return questions.findIndex(q => q.status !== 'solved') === -1;
    };

    render() {
        return <CheckButton checkSQL={this.checkSQL} {...this.props} />;
    }
}

const mapStateToProps = ({ questions, test, tabs }) => {
    return {
        questions: questions.questions,
        currQuestionIndex: questions.currQuestionIndex,
        isCompletedPopupVisible: test.isCompletedPopupVisible,
        isTestCompleted: test.isTestCompleted,
        tabs: tabs.tabs,
        currTabIndex: selectors.getCurrentTabIndex({ questions, tabs }),
        currQuestion: selectors.getCurrentQuestion({ questions }),
        currTab: selectors.getCurrentTab({ questions, tabs }),
    };
};

const mapDispatchToProps = dispatch => ({
    changeTableActivity: index => dispatch(changeTableActivity(index)),
    isChecking: (qid, tid, checking) => dispatch(isChecking(qid, tid, checking)),
    changeQuestionStatus: index => dispatch(changeQuestionStatus(index)),
    changeSolvedQuestionSQL: index => dispatch(changeSolvedQuestionSQL(index)),
    changeTabResponse: (qid, tid, response) => dispatch(changeTabResponse(qid, tid, response)),
    changePopupVisibility: index => dispatch(changePopupVisibility(index)),
    changeTestStatus: index => dispatch(changeTestStatus(index)),
    addNotification: (message, level) => dispatch(addNotification(message, level)),
    changeSQLResponseType: (SQLResponseType, tid, qid) => dispatch(changeSQLResponseType(SQLResponseType, tid, qid)),
});

export const CheckButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CheckButtonC);
