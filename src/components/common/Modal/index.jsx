import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import propTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';
import PerfectScrollbar from 'react-perfect-scrollbar';

import './index.scss';

const ModalArea = posed.div({
    enter: { opacity: 1, transition: { duration: 200 } },
    exit: { opacity: 0, transition: { duration: 200 } },
});

const ModalAnimBlock = posed.div({
    enter: { opacity: 1, scale: 1, x: '-50%', y: '-50%', transition: { duration: 200 } },
    exit: { opacity: 0, scale: 1.1, x: '-50%', y: '-50%', transition: { duration: 200 } },
});

class Modal extends Component {
    static defaultProps = {
        title: 'Модальное окно',
        content: 'Содержимое окна',
        style: {},
    };

    static propTypes = {
        title: propTypes.string,
        style: propTypes.object,
        onClose: propTypes.func,
        opened: propTypes.bool,
        poseKey: propTypes.oneOfType([propTypes.number, propTypes.string]),
    };

    render() {
        const { title, onClose, style, children, opened, poseKey, maxHeight, maxWidth } = this.props;

        return (
            <PoseGroup>
                {opened && (
                    <ModalArea className="modal-area" key={poseKey}>
                        <div className="modal-background" onClick={onClose} />
                        <PoseGroup>
                            <ModalAnimBlock className="modal" style={{ ...style, maxHeight, maxWidth }} key="modal">
                                <h1 className="modal-title">
                                    {title}
                                    <FontAwesomeIcon icon="times" className="modal-close" onClick={onClose} />
                                </h1>
                                <PerfectScrollbar className="modal-content">{children}</PerfectScrollbar>
                            </ModalAnimBlock>
                        </PoseGroup>
                    </ModalArea>
                )}
            </PoseGroup>
        );
    }
}

export default Modal;
