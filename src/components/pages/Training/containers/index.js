import { connect } from 'react-redux';
import { nextQuestion } from '../../../../store/actions/questionActions';
import { changeEditorTheme } from '../../../../store/actions/settingsActions';
import { loadTest } from '../../../../store/actions/testActions';

import Training from '../index';

const mapStateToProps = ({ questions, tabs, test, settings }, ownProps) => {
    return {
        questions: questions.questions,
        currQuestionIndex: questions.currQuestionIndex,
        tabs: tabs.tabs,
        isTestLoaderVisible: test.isTestLoaderVisible,
        testLoaderErrorMessage: test.testLoaderErrorMessage,
        isInputAreaPinned: questions.isInputAreaPinned,
        isLogoVisible: test.isLogoVisible,
        editorTheme: settings.editorTheme,
    };
};

const mapDispatchToProps = dispatch => ({
    loadTest: () => dispatch(loadTest()),
    nextQuestion: () => dispatch(nextQuestion()),
    changeEditorTheme: theme => dispatch(changeEditorTheme(theme)),
});

const TrainingContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Training);

export default TrainingContainer;
