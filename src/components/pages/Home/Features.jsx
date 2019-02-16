import React from 'react';
import { Link } from 'react-router-dom';

import feathers from '../../../images/feathers.svg';
import reflection from '../../../images/reflection.svg';
import sweat from '../../../images/sweat.svg';
import layers from '../../../images/layers.svg';

const Features = props => (
    <div className="features-block">
        <div className="content">
            <div className="feature">
                <img className="feature__image" alt="" src={feathers} />
                <div className="feature__title">Feature #1</div>
                <div className="feature__text">Кратенькое описание первой особенности.</div>
            </div>
            <div className="feature">
                <img className="feature__image" alt="" src={reflection} />
                <div className="feature__title">Feature #2</div>
                <div className="feature__text">Кратенькое описание второй особенности.</div>
            </div>
            <div className="feature">
                <img className="feature__image" alt="" src={sweat} />
                <div className="feature__title">Feature #3</div>
                <div className="feature__text">Кратенькое описание третьей особенности.</div>
            </div>
            <div className="feature">
                <img className="feature__image" alt="" src={layers} />
                <div className="feature__title">Feature #4</div>
                <div className="feature__text">Кратенькое описание четвёртой особенности.</div>
            </div>
            <div className="feature question">
                <div className="feature__title">Новичок в программировании?</div>
                <div className="feature__text">Тогда этот сервис для тебя! (или шото типа того)</div>
                <Link to="/training" className="feature__button">
                    Начать
                </Link>
            </div>
        </div>
    </div>
);

export default Features;
