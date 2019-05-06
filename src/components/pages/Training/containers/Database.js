import { connect } from 'react-redux';

import Database from '../Database';

const mapStateToProps = (state, ownProps) => {
    return {
        isDatabaseLoading: state.database.isDatabaseLoading,
        database: state.database.database,
        ...ownProps,
    };
};

export const DatabaseContainer = connect(mapStateToProps)(Database);
