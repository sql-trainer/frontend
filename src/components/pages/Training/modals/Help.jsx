import React from 'react';
import Modal from '../../../common/Modal';
import Collapsible from 'react-collapsible';

const Panel = props => {
    return (
        <Collapsible className="help" trigger={props.trigger}>
            {props.children}
        </Collapsible>
    );
};

const HelpModal = props => {
    const { visible, onClose } = props;

    return (
        <Modal title="Справка" opened={visible} poseKey="help" onClose={onClose} maxHeight={500} maxWidth={600}>
            <Panel trigger="Какие сочетания клавиш есть у редактора?">
                <ul>
                    <li>
                        <b>F9</b> - запустить проверку запроса
                    </li>
                    <li>
                        <b>CTRL + ALT + [</b> - Предыдущий вопрос
                    </li>
                    <li>
                        <b>CTRL + ALT + ]</b> - Следующий вопрос
                    </li>
                    <li>
                        <b>CTRL + ALT + LEFT</b> - Предыдущая вкладка
                    </li>
                    <li>
                        <b>CTRL + ALT + RIGHT</b> - Следующая вкладка
                    </li>
                    <li>
                        <b>SHIFT + ALT + D</b> - Удалить текущую вкладку
                    </li>
                    <li>
                        <b>SHIFT + ALT + N</b> - Создать новую вкладку
                    </li>
                </ul>
            </Panel>
            <Panel trigger="Какая СУБД используется для проверки запросов?">
                <p>Для проверки ваших запросов используется СУБД MySQL 8.0.</p>
            </Panel>
        </Modal>
    );
};

export default HelpModal;
