import React, { Fragment, useState } from 'react';
import Modal from '../../../common/Modal';
import classNames from 'classnames';

const Panel = props => {
    const [opened, setOpened] = useState(false);

    return (
        <div className={classNames('panel', 'help-accordion')} data-opened={opened}>
            <div className={classNames('panel-title', 'help-accordion-button')} onClick={e => setOpened(!opened)}>
                {props.title}
            </div>
            <div
                className={classNames('panel-body', 'help-accordion-panel')}
                style={{ display: opened ? 'block' : 'none' }}
            >
                {props.children}
            </div>
        </div>
    );
};

const createShortcutLayout = sequence => {
    return sequence.map((label, index) => (
        <Fragment key={label}>
            <div className="key">{label.toUpperCase()}</div>
            {index !== sequence.length - 1 ? '+' : ''}
        </Fragment>
    ));
};

const HelpModal = React.memo(props => {
    const { visible, onClose } = props;

    return (
        <Modal title="Справка" opened={visible} poseKey="help" onClose={onClose} maxHeight={500} maxWidth={600}>
            <Panel title="Сочетания клавиш в приложении">
                <div className="shortcuts">
                    {Object.entries(props.shortcuts).map((type, index) =>
                        Object.entries(type[1]).map(shortcut => (
                            <Fragment key={shortcut[0]}>
                                <div className="shortcut-title">{shortcut[1].description}</div>
                                <div className="shortcut" tabIndex="-1">
                                    <div className="shortcut-keys help-modal">
                                        {createShortcutLayout(shortcut[1].sequence)}
                                    </div>
                                </div>
                            </Fragment>
                        )),
                    )}
                </div>
            </Panel>
            <Panel title="Версия СУБД, использующаяся при проверке запросов">
                <p>Для проверки ваших запросов используется СУБД MySQL 8.0.</p>
            </Panel>
        </Modal>
    );
});

export default HelpModal;
