import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import propTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';
import PerfectScrollbar from 'react-perfect-scrollbar';

import CustomScrollbars from '../../pages/Training/CustomScrollbars';

import './index.scss';

const ModalArea = posed.div({
    enter: { opacity: 1, transition: { duration: 200 } },
    exit: { opacity: 0, transition: { duration: 200 } },
});

class Modal extends Component {
    static fadeScale = {
        enter: { scale: 1, transition: { duration: 200 } },
        exit: { scale: 0.9, transition: { duration: 200 } },
    };

    static fade = {
        enter: { opacity: 1, transition: { duration: 200 } },
        exit: { opacity: 0, transition: { duration: 200 } },
    };

    static defaultProps = {
        title: 'Модальное окно',
        content: 'Содержимое окна',
        style: {},
        showCloseButton: true,
        exitStyle: Modal.fadeScaleAnimation,
        enterStyle: Modal.fadeScaleAnimation,
        animation: 'fadeScale',
    };

    static propTypes = {
        title: propTypes.string,
        style: propTypes.object,
        onClose: propTypes.func,
        opened: propTypes.bool,
        poseKey: propTypes.oneOfType([propTypes.number, propTypes.string]),
        maxHeight: propTypes.number,
        minHeight: propTypes.number,
        fullscreen: propTypes.bool,
        showCloseButton: propTypes.bool,
    };

    render() {
        const {
            title,
            onClose,
            style,
            children,
            opened,
            poseKey,
            maxHeight,
            maxWidth,
            fullscreen,
            showCloseButton,
            animation,
        } = this.props;

        const modalStyle = {
            ...style,
            maxHeight: !fullscreen ? maxHeight : '100vh',
            maxWidth: !fullscreen ? maxWidth : '100vw',
            borderRadius: fullscreen ? 0 : 'auto',
        };

        const ModalAnimBlock = posed.div(Modal[animation]);

        return (
            <PoseGroup>
                {opened && (
                    <ModalArea className="modal-area" key={poseKey}>
                        <div className="modal-background" onClick={onClose} />
                        <ModalAnimBlock className="modal" style={modalStyle} key="modal">
                            <h1 className="modal-title">
                                <span>{title}</span>
                                {showCloseButton && (
                                    <FontAwesomeIcon icon="times" className="modal-close" onClick={onClose} />
                                )}
                            </h1>
                            <CustomScrollbars className="modal-content">{children}</CustomScrollbars>
                        </ModalAnimBlock>
                    </ModalArea>
                )}
            </PoseGroup>
        );
    }
}

export default Modal;
