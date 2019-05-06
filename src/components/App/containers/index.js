import { connect } from 'react-redux';
import { nextQuestion, prevQuestion } from '../../../store/actions/questionActions';

import App from '../index';

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
    };
};

const mapDispatchToProps = dispatch => ({
    nextQuestion: () => dispatch(nextQuestion()),
    prevQuestion: () => dispatch(prevQuestion()),
});

export const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

// export default AppContainer;
