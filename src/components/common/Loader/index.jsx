import React from 'react';
import Logo from '../Logo';

import './index.scss';

const Loader = props => {
    if (props.error) {
        return (
            <div className="loader">
                <Logo style={{ zIndex: 5 }} />
                <div className="loader-error-message">Возникла ошибка при загрузке страницы</div>
            </div>
        );
    } else if (props.pastDelay) {
        return (
            <div className="loader">
                <Logo animated style={{ zIndex: 5 }} />
                <div className="loader-error-message">{props.errorMessage}</div>
            </div>
        );
    } else {
        return null;
    }
};

export default Loader;
