import React from 'react';
import classNames from 'classnames';

import './index.scss';

const Logo = props => (
    <div className={classNames({ animated: props.animated }, 'logo')}>
        <div className="logo__quarter" />
        <div className="logo__quarter" />
        <div className="logo__quarter" />
        <div className="logo__quarter" />
    </div>
);

export default Logo;
