import { connect } from 'react-redux';
import { changeTabHtml, changeSQLResponseType } from '../../../../store/actions/tabsActions';

import SQLEditor from '../SQLEditor';

const mapStateToProps = (state, ownProps) => {
    return {
        questions: state.questions.questions,
        tabs: state.tabs.tabs,
        currQuestionIndex: state.questions.currQuestionIndex,
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
