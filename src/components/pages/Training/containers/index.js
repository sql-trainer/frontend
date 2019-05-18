import { connect } from 'react-redux';
import { nextQuestion, prevQuestion } from '../../../../store/actions/questionActions';
import { changeEditorTheme, changeACAvailability } from '../../../../store/actions/settingsActions';
import { loadTest, checkSQL } from '../../../../store/actions/testActions';
import { prevTab, nextTab, createNewTab, deleteTab } from '../../../../store/actions/tabsActions';

import * as selectors from '../../../../store/selectors';
import Training from '../index';

const mapStateToProps = ({ questions, tabs, test, settings }, ownProps) => {
    return {
        questions: questions.questions,
        currQuestionIndex: questions.currQuestionIndex,
        isTestLoaderVisible: test.isTestLoaderVisible,
        testLoaderErrorMessage: test.testLoaderErrorMessage,
        isInputAreaPinned: settings.isInputAreaPinned,
        isLogoVisible: test.isLogoVisible,
        editorTheme: settings.editorTheme,
        isACAvailable: settings.isACAvailable,
        currTab: selectors.getCurrentTab({ questions, tabs }),
        currQuestion: selectors.getCurrentQuestion({ questions }),
        currTabIndex: selectors.getCurrentTabIndex({ questions, tabs }),
    };
};

const mapDispatchToProps = dispatch => ({
    loadTest: () => dispatch(loadTest()),
    nextQuestion: () => dispatch(nextQuestion()),
    prevQuestion: () => dispatch(prevQuestion()),
    prevTab: qid => dispatch(prevTab(qid)),
    nextTab: qid => dispatch(nextTab(qid)),
    createNewTab: qid => dispatch(createNewTab(qid)),
    deleteTab: qid => dispatch(deleteTab(qid)),
    changeACAvailability: () => dispatch(changeACAvailability()),
    checkSQL: (qid, tid) => dispatch(checkSQL(qid, tid)),
    changeEditorTheme: theme => dispatch(changeEditorTheme(theme)),
});

const TrainingContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Training);

export default TrainingContainer;
