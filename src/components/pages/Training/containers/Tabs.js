import { connect } from 'react-redux';
import {
    createNewTab,
    changeTab,
    deleteTab,
    pinInputArea,
    saveTabsToLocalStorage,
} from '../../../../store/actions/tabsActions';

import Tabs from '../Tabs';

const mapStateToProps = (state, ownProps) => {
    return {
        questions: state.questions.questions,
        currQuestionIndex: state.questions.currQuestionIndex,
        isInputAreaPinned: state.questions.isInputAreaPinned,
        allTabs: state.tabs.tabs,
        ...ownProps,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewTab: id => dispatch(createNewTab(id)),
        changeTab: (index, id) => dispatch(changeTab(index, id)),
        deleteTab: qid => dispatch(deleteTab(qid)),
        pinInputArea: () => dispatch(pinInputArea()),
        saveTabsToLocalStorage: () => dispatch(saveTabsToLocalStorage()),
    };
};

export const TabsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tabs);
