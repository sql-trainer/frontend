import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const CustomScrollbars = ({ className, prefix, children }) => {
    return (
        <Scrollbars
            className={className}
            renderTrackHorizontal={props => (
                <div {...props} className={`${prefix ? prefix + '-track-horizontal ' : ''}track-horizontal`} />
            )}
            renderTrackVertical={props => (
                <div {...props} className={`${prefix ? prefix + '-track-vertical ' : ''}track-vertical`} />
            )}
            // renderThumbHorizontal={props => (
            //     <div {...props} className={`${props.prefix ? props.prefix + '-' : ''}thumb-horizontal`} />
            // )}
            // renderThumbVertical={props => (
            //     <div {...props} className={`${props.prefix ? props.prefix + '-' : ''}thumb-vertical`} />
            // )}
            renderView={props => <div {...props} className={`${prefix ? prefix + '-view ' : ''}view`} />}
        >
            {children}
        </Scrollbars>
    );
};

export default CustomScrollbars;
