import React from 'react';
import Logo from '../Logo';
import posed, { PoseGroup } from 'react-pose';

import './index.scss';

const LoaderAnim = posed.div({
    enter: { opacity: 1 },
    exit: { opacity: 0 },
});

const Loader = props => (
    <PoseGroup>
        {props.isLoaderVisible && (
            <LoaderAnim className="loader" key={props.importKey}>
                <Logo animated style={{ zIndex: 5, display: props.isLogoVisible ? 'auto' : 'none' }} />
                <div className="loader-error-message">{props.errorMessage}</div>
            </LoaderAnim>
        )}
    </PoseGroup>
);

export default Loader;
