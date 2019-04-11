import { connect } from 'react-redux';
import { loadQuestionsFromAPI, nextQuestion } from '../../../../store/actions/questionActions';

import Training from '../index';

const mapStateToProps = ({ questions, database, tabs }, ownProps) => {
    return {
        questions: questions.questions,
        currQuestionIndex: questions.currQuestionIndex,
    };
};

const mapDispatchToProps = dispatch => ({
    loadQuestionsFromAPI: () => dispatch(loadQuestionsFromAPI()),
    nextQuestion: () => dispatch(nextQuestion()),
});

const TrainingContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Training);

export default TrainingContainer;
