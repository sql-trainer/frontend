import React from 'react';
import classNames from 'classnames';

import './index.scss';

const Switch = props => (
    <div className={classNames('switch', props.checked ? 'on' : 'off')}>
        <input type="checkbox" checked={props.checked} onChange={props.onChange} />
    </div>
);

export default Switch;
