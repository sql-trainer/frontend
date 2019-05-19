import { connect } from 'react-redux';
import {
    changeShortcut,
    enableShortcutDetectorMode,
    changeEditorTheme,
    changeACAvailability,
} from '../../../../../store/actions/settingsActions';
import { addNotification } from '../../../../../store/actions/notificationActions';

import * as selectors from '../../../../../store/selectors';
import SettingsModal from '../Settings';

const mapStateToProps = ({ settings }, ownProps) => {
    return {
        editorTheme: settings.editorTheme,
        shortcuts: settings.shortcuts,
        isDetectorEnabled: settings.isDetectorEnabled,
        isACAvailable: settings.isACAvailable,
        globalKeyMap: selectors.getGlobalKeyMap({ settings }),
        shortcutSequences: selectors.getShortcutSequences({ settings }),
        ...ownProps,
    };
};

const mapDispatchToProps = dispatch => ({
    enableShortcutDetectorMode: enable => dispatch(enableShortcutDetectorMode(enable)),
    changeShortcut: (shortcutType, shortcutName, combination) =>
        dispatch(changeShortcut(shortcutType, shortcutName, combination)),
    changeEditorTheme: theme => dispatch(changeEditorTheme(theme)),
    changeACAvailability: () => dispatch(changeACAvailability()),
    addNotification: (message, level) => dispatch(addNotification(message, level)),
});

const SettingsModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SettingsModal);

export default SettingsModalContainer;
