import { connect } from 'react-redux';
import { loadQuestionsFromAPI } from '../../../../store/actions/questionActions';

import Training from '../index';

const mapStateToProps = ({ questions, database, tabs }, ownProps) => {
    return {
        questions: questions.questions,
        currQuestionIndex: questions.currQuestionIndex,
    };
};

const mapDispatchToProps = dispatch => ({
    loadQuestionsFromAPI: () => dispatch(loadQuestionsFromAPI()),
});

const TrainingContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Training);

export default TrainingContainer;
