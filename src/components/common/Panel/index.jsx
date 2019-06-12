import React, { useState } from 'react';
import classNames from 'classnames';
import posed from 'react-pose';

const PanelBodyAnim = posed.div({
    opened: { height: 'auto', opacity: 1, transition: { duration: 200 } },
    closed: { height: '0px', opacity: 0, transition: { duration: 200 } },
});

const Panel = props => {
    const [opened, setOpened] = useState(false);

    const updateScroll = () => {
        if (props.scrollRef) props.scrollRef.current.updateScroll();
    };

    const togglePanel = () => {
        setOpened(!opened);
    };

    return (
        <div className={classNames('panel', props.panelClassName)} data-opened={opened}>
            <div className={classNames('panel-title', props.panelTitleClassName)} onClick={togglePanel}>
                {props.title}
            </div>
            <PanelBodyAnim
                className={classNames('panel-body', props.panelBodyClassName)}
                pose={opened ? 'opened' : 'closed'}
                onPoseComplete={updateScroll}
            >
                <div className="panel-content">{props.children}</div>
            </PanelBodyAnim>
        </div>
    );
};

export default Panel;
