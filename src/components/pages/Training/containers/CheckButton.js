import { connect } from 'react-redux';
import { checkSQL } from '../../../../store/actions/testActions';
import * as selectors from '../../../../store/selectors';

import CheckButton from '../CheckButton';

const mapStateToProps = ({ questions, test, tabs }, ownProps) => {
    return {
        questions: questions.questions,
        currQuestionIndex: questions.currQuestionIndex,
        isCompletedPopupVisible: test.isCompletedPopupVisible,
        isTestCompleted: test.isTestCompleted,
        currTabIndex: selectors.getCurrentTabIndex({ questions, tabs }),
        // currQuestion: selectors.getCurrentQuestion({ questions }),
        currTab: selectors.getCurrentTab({ questions, tabs }),
        ...ownProps,
    };
};

const mapDispatchToProps = dispatch => ({
    checkSQL: (qid, tid) => dispatch(checkSQL(qid, tid)),
});

export const CheckButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CheckButton);
