import React from 'react';
import Modal from '../../../common/Modal';

import { StatisticsBlockContainer as StatisticsBlock } from '../containers/StatisticsBlock';

const StatisticsModal = props => {
    const { visible, onClose } = props;

    return (
        <Modal title="Статистика" opened={visible} poseKey="info" onClose={onClose} maxHeight={500} maxWidth={800}>
            <StatisticsBlock />
        </Modal>
    );
};

export default StatisticsModal;
