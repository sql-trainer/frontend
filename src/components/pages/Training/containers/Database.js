import { connect } from 'react-redux';
import { changeTableActivity } from '../../../../store/actions/databaseActions';

import Database from '../Database';

const mapStateToProps = (state, ownProps) => {
    return {
        isDatabaseLoading: state.database.isDatabaseLoading,
        database: state.database.database,
        ...ownProps,
    };
};

const mapDispatchToProps = dispatch => ({
    changeTableActivity: index => dispatch(changeTableActivity(index)),
});

export const DatabaseContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Database);
