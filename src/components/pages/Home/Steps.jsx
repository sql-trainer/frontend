import React from 'react';

import graph from '../../../images/graph.svg';
import list from '../../../images/list.svg';
import login from '../../../images/log-in.svg';
import test from '../../../images/test.svg';

const Steps = props => (
    <div className="steps-block">
        <div className="content">
            <h1>Как это работает</h1>
            <div className="steps">
                <div className="step">
                    <div className="step__top">
                        <img src={login} alt="" className="step__icon" />
                    </div>
                    <div className="step__info">
                        <div className="step__counter">1</div>
                        <div className="step__description">Зарегистрируйтесь в системе</div>
                    </div>
                </div>
                <div className="step">
                    <div className="step__top">
                        <img src={list} alt="" className="step__icon" />
                    </div>
                    <div className="step__info">
                        <div className="step__counter">2</div>
                        <div className="step__description">Добавьте учеников в группу</div>
                    </div>
                </div>
                <div className="step">
                    <div className="step__top">
                        <img src={test} alt="" className="step__icon" />
                    </div>
                    <div className="step__info">
                        <div className="step__counter">3</div>
                        <div className="step__description">Сгенерируйте тест</div>
                    </div>
                </div>
                <div className="step">
                    <div className="step__top">
                        <img src={graph} alt="" className="step__icon" />
                    </div>
                    <div className="step__info">
                        <div className="step__counter">4</div>
                        <div className="step__description">Отслеживайте результаты</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Steps;
