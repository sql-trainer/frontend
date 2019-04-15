import { connect } from 'react-redux';
import { resetTest } from '../../../../store/actions/testActions';

import Header from '../index';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
});

const mapDispatchToProps = dispatch => {
    return {
        resetTest: () => dispatch(resetTest()),
    };
};

export const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);
