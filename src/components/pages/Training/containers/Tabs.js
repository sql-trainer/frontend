import { connect } from 'react-redux';
import { createNewTab, changeTab, deleteTab, pinInputArea } from '../../../../store/actions/tabsActions';

import Tabs from '../Tabs';

const mapStateToProps = (state, ownProps) => {
    return {
        questions: state.questions.questions,
        isInputAreaPinned: state.questions.isInputAreaPinned,
        ...ownProps,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewTab: () => dispatch(createNewTab()),
        changeTab: index => dispatch(changeTab(index)),
        deleteTab: () => dispatch(deleteTab()),
        pinInputArea: () => dispatch(pinInputArea()),
    };
};

export const TabsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tabs);
