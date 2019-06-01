import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = props => (
    <div className="about-us-block">
        <div className="content">
            <h1>Что ты такое?</h1>
            <div className="about-us-block__text">
                <p>
                    Если вы попали сюда с целью изучить язык SQL, то не ошиблись кликнув именно на эту ссылку в
                    поисковой системе. Здесь вы сможете как изучить SQL с нуля, так и отточить свои навыки, если вы уже
                    знакомы с ним.
                </p>
                <p>
                    Сервис предоставляет <Link to="/training/">подробный справочник</Link> по всем возможностям языка
                    SQL с различными интерактивными примерами и <Link to="/training/">тренажёр</Link> с большим
                    количеством различных вопросов и баз данных.
                </p>
                <p>
                    Сервис абсолютно <b>бесплатен</b>(и будет таким всегда!) и не требует регистрации для того, чтобы
                    начать им пользоваться.
                </p>
            </div>
        </div>
    </div>
);

export default AboutUs;
