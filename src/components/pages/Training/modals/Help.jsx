import React from 'react';
import Modal from '../../../common/Modal';
import Panel from '../../../common/Panel';

const CustomPanel = props => (
    <Panel
        panelClassName="help-accordion"
        panelTitleClassName="help-accordion-button"
        panelBodyClassName="help-accordion-panel"
        {...props}
    />
);

const HelpModal = React.memo(props => {
    const { visible, onClose } = props;

    return (
        <Modal title="Справка" opened={visible} poseKey="help" onClose={onClose} maxHeight={500} maxWidth={600}>
            <CustomPanel title="Версия СУБД, использующаяся при проверке запросов">
                <p>Для проверки ваших запросов используется СУБД MySQL 8.0.</p>
            </CustomPanel>
        </Modal>
    );
});

export default HelpModal;
