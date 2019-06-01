import React from 'react';
import { Link } from 'react-router-dom';

import tasks from '../../../images/tasks.svg';
import books from '../../../images/books.svg';
import pie from '../../../images/pie.svg';

const Features = props => (
    <div className="features-block">
        <div className="content">
            <div className="feature">
                <img className="feature__image" alt="" src={books} />
                <div>
                    <div className="feature__title">Подробный справочник</div>
                    <div className="feature__text">
                        Мы составили подробный справочник с интерактивными примерами по всем особенностям языка SQL
                    </div>
                </div>
            </div>
            <div className="feature">
                <img className="feature__image" alt="" src={tasks} />
                <div>
                    <div className="feature__title">Большое количество заданий</div>
                    <div className="feature__text">
                        Вам будет доступно множество вопросов и баз данных для оттачивания своих навыков в построении
                        запросов
                    </div>
                </div>
            </div>
            <div className="feature">
                <img className="feature__image" alt="" src={pie} />
                <div>
                    <div className="feature__title">Удобный интерфейс</div>
                    <div className="feature__text">
                        Мы разработали отличный интерфейс, чтобы вы могли полностью сконцентрироваться на тренировках
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Features;
