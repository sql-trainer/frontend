import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import NotificationSystem from 'react-notification-system';

class Notifications extends PureComponent {
    notificationSystem = React.createRef();

    componentDidUpdate() {
        const { message, level } = this.props.notification;
        const notification = this.notificationSystem.current;

        notification.addNotification({ message, level, autoDismiss: 4, dismissible: 'click' });
    }

    render() {
        return <NotificationSystem ref={this.notificationSystem} />;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        notification: state.notification.notification,
        ...ownProps,
    };
};

export const NotificationsContainer = connect(mapStateToProps)(Notifications);
