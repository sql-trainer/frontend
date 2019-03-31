import { connect } from 'react-redux';
import * as questions from '../../../../store/actions/questionActions';
import * as database from '../../../../store/actions/databaseActions';
import * as tabs from '../../../../store/actions/tabsActions';

import Training from '../index';

const mapStateToProps = ({ questions, database, tabs }, ownProps) => {
    return {
        questions: questions.questions,
        isQuestionsLoading: questions.isQuestionsLoading,
        currQuestion: questions.currQuestion,
        database: database.database,
        isDatabaseLoading: database.isDatabaseLoading,
        // tabs: tabs.tabs,
        // currTab: tabs.currTab,
        tooltip: ownProps.tooltip,
    };
};

const mapDispatchToProps = {
    ...questions,
    ...database,
    ...tabs,
};

const TrainingContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Training);

export default TrainingContainer;
