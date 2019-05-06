import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import Modal from '../../../common/Modal';

const HelpModal = props => {
    const { visible, onClose } = props;

    return (
        <Modal
            title="Справка"
            opened={visible}
            poseKey="help"
            // onClose={() => this.setState({ isModalHelpOpened: !isModalHelpOpened })}
            onClose={onClose}
            maxHeight={500}
            maxWidth={600}
        >
            <Accordion allowZeroExpanded>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>Какие сочетания клавиш есть у редактора?</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
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
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>Какая СУБД используется для проверки запросов?</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <p>Для проверки ваших запросов используется СУБД MySQL 8.0.</p>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
        </Modal>
    );
};

export default HelpModal;
