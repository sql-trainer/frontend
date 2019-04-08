import { connect } from 'react-redux';
import { changeTabHtml } from '../../../../store/actions/tabsActions';

import SQLEditor from '../SQLEditor';

const mapStateToProps = (state, ownProps) => {
    return {
        questions: state.questions.questions,
        ...ownProps,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeTabHtml: (index, html) => dispatch(changeTabHtml(index, html)),
    };
};

export const SQLEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SQLEditor);
