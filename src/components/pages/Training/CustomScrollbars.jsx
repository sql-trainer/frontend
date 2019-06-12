import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class CustomScrollbars extends Component {
    state = {
        update: false,
    };

    updateScroll = () => this.setState({ update: !this.state.update });

    render() {
        const { className, prefix, children, scrollRef, ...ownProps } = this.props;

        return (
            <Scrollbars
                {...ownProps}
                ref={scrollRef}
                className={className}
                renderTrackHorizontal={props => (
                    <div {...props} className={`${prefix ? prefix + '-track-horizontal ' : ''}track-horizontal`} />
                )}
                renderTrackVertical={props => (
                    <div {...props} className={`${prefix ? prefix + '-track-vertical ' : ''}track-vertical`} />
                )}
                renderThumbHorizontal={props => (
                    <div {...props} className={`${prefix ? prefix + '-thumb-horizontal ' : ''}thumb-horizontal`} />
                )}
                renderThumbVertical={props => (
                    <div {...props} className={`${prefix ? prefix + '-thumb-vertical ' : ''}thumb-vertical`} />
                )}
                renderView={props => <div {...props} className={`${prefix ? prefix + '-view ' : ''}view`} />}
            >
                {children}
            </Scrollbars>
        );
    }
}

export default CustomScrollbars;
