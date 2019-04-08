import { connect } from 'react-redux';
import { changePopupVisibility } from '../../../../store/actions/testActions';
import { loadQuestionsFromAPI } from '../../../../store/actions/questionActions';
import { addNotification } from '../../../../store/actions/notificationActions';

import CompletedPopup from '../CompletedPopup';

const mapStateToProps = (state, ownProps) => {
    return {
        isCompletedPopupVisible: state.test.isCompletedPopupVisible,
        ...ownProps,
    };
};

const mapDispatchToProps = dispatch => ({
    changePopupVisibility: () => dispatch(changePopupVisibility()),
    loadQuestionsFromAPI: () => dispatch(loadQuestionsFromAPI()),
    addNotification: (message, level) => dispatch(addNotification(message, level)),
});

export const CompletedPopupContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CompletedPopup);
