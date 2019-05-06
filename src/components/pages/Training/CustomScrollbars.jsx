import React, { forwardRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
const CustomScrollbars = forwardRef(({ className, prefix, children }, ref) => {
    return (
        <Scrollbars
            ref={ref}
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
});

export default CustomScrollbars;
