import { connect } from 'react-redux';
import { changeTabHtml, changeSQLResponseType } from '../../../../store/actions/tabsActions';
import { replaceKeywords, changeACVisibility } from '../../../../store/actions/autocompleteActions';
import * as selectors from '../../../../store/selectors';

import SQLEditor from '../SQLEditor';

const mapStateToProps = ({ questions, tabs, settings, database, ac }, ownProps) => {
    return {
        questions: questions.questions,
        tabs: tabs.tabs,
        currQuestionIndex: questions.currQuestionIndex,
        editorTheme: settings.editorTheme,
        keywords: ac.keywords,
        options: ac.options,
        visible: ac.visible,
        isACAvailable: settings.isACAvailable,
        currTabIndex: selectors.getCurrentTabIndex({ questions, tabs }),
        currTab: selectors.getCurrentTab({ questions, tabs }),
        ...ownProps,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeTabHtml: (index, html, id) => dispatch(changeTabHtml(index, html, id)),
        replaceKeywords: (keywords, type) => dispatch(replaceKeywords(keywords, type)),
        changeACVisibility: visible => dispatch(changeACVisibility(visible)),
        changeSQLResponseType: (SQLResponseType, tid, qid) =>
            dispatch(changeSQLResponseType(SQLResponseType, tid, qid)),
    };
};

export const SQLEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SQLEditor);
