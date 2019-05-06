import { connect } from 'react-redux';
import { changeTabHtml, changeSQLResponseType } from '../../../../store/actions/tabsActions';
import * as selectors from '../../../../store/selectors';

import SQLEditor from '../SQLEditor';

const mapStateToProps = ({ questions, tabs, settings }, ownProps) => {
    return {
        questions: questions.questions,
        tabs: tabs.tabs,
        currQuestionIndex: questions.currQuestionIndex,
        editorTheme: settings.editorTheme,
        currTabIndex: selectors.getCurrentTabIndex({ questions, tabs }),
        currTab: selectors.getCurrentTab({ questions, tabs }),
        ...ownProps,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeTabHtml: (index, html, id) => dispatch(changeTabHtml(index, html, id)),
        changeSQLResponseType: (SQLResponseType, tid, qid) =>
            dispatch(changeSQLResponseType(SQLResponseType, tid, qid)),
    };
};

export const SQLEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SQLEditor);
