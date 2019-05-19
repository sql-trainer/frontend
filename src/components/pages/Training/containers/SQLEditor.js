import { connect } from 'react-redux';
import { changeTabHtml, changeIndicatorType } from '../../../../store/actions/tabsActions';
import { replaceKeywords, changeAutocompletionVisibility } from '../../../../store/actions/autocompleteActions';
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
        changeAutocompletionVisibility: visible => dispatch(changeAutocompletionVisibility(visible)),
        changeIndicatorType: (indicatorType, tid, qid) => dispatch(changeIndicatorType(indicatorType, tid, qid)),
    };
};

export const SQLEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SQLEditor);
