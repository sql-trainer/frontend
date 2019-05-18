import { connect } from 'react-redux';
import { createNewTab, changeTab, deleteTab } from '../../../../store/actions/tabsActions';
import { pinInputArea } from '../../../../store/actions/settingsActions';
import { changeVisibility } from '../../../../store/actions/autocompleteActions';
import * as selectors from '../../../../store/selectors';

import Tabs from '../Tabs';

const mapStateToProps = ({ questions, tabs, settings }, ownProps) => {
    return {
        isInputAreaPinned: settings.isInputAreaPinned,
        currQuestion: selectors.getCurrentQuestion({ questions }),
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
        changeVisibility: visible => dispatch(changeVisibility(visible)),
    };
};

export const TabsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tabs);
