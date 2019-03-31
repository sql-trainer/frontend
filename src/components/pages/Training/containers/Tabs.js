import { connect } from 'react-redux';
import { createNewTab, changeTab, deleteTab } from '../../../../store/actions/tabsActions';

import Tabs from '../Tabs';

const mapStateToProps = (state, ownProps) => {
    return {
        // currTab: state.tabs.currTab,
        ...ownProps,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewTab: () => {
            dispatch(createNewTab());
        },
        changeTab: index => {
            dispatch(changeTab(index));
        },
        deleteTab: () => {
            dispatch(deleteTab());
        },
    };
};

const TabsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tabs);

export default TabsContainer;
