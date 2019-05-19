import { connect } from 'react-redux';

import HelpModal from '../Help';

const mapStateToProps = ({ settings }, ownProps) => {
    return {
        shortcuts: settings.shortcuts,
        ...ownProps,
    };
};

const mapDispatchToProps = dispatch => ({});

const HelpModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HelpModal);

export default HelpModalContainer;
