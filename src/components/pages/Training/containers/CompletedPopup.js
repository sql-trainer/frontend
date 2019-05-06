import { connect } from 'react-redux';
import { resetTest, changePopupVisibility } from '../../../../store/actions/testActions';

import CompletedPopup from '../CompletedPopup';

const mapStateToProps = (state, ownProps) => {
    return {
        isCompletedPopupVisible: state.test.isCompletedPopupVisible,
        ...ownProps,
    };
};

const mapDispatchToProps = dispatch => ({
    resetTest: () => dispatch(resetTest()),
    changePopupVisibility: visible => dispatch(changePopupVisibility(visible)),
});

export const CompletedPopupContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CompletedPopup);
