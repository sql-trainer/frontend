import { connect } from 'react-redux';

import StatisticsBlock from '../StatisticsBlock';

const mapStateToProps = (state, ownProps) => {
    return {
        editorTheme: state.settings.editorTheme,
        questions: state.questions.questions,
        ...ownProps,
    };
};

export const StatisticsBlockContainer = connect(mapStateToProps)(StatisticsBlock);
