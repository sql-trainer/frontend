import { connect } from 'react-redux';
import { createNewTab, changeTab, deleteTab, saveTabsToLocalStorage } from '../../../../store/actions/tabsActions';
import { pinInputArea } from '../../../../store/actions/settingsActions';
import * as selectors from '../../../../store/selectors';

import Tabs from '../Tabs';

const mapStateToProps = ({ questions, tabs, settings }, ownProps) => {
    return {
        questions: questions.questions,
        currQuestionIndex: questions.currQuestionIndex,
        isInputAreaPinned: settings.isInputAreaPinned,
        // allTabs: tabs.tabs,
        tabs: selectors.getCurrentTabs({ questions, tabs }),
        currTabIndex: selectors.getCurrentTabIndex({ questions, tabs }),
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
