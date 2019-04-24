import React from "react";

const HandbookContent = props => (
  <div className="banner__inner">
    <div className="banner__text">
        <div className="title">
            <h1>Современный справочник по SQL</h1>
        </div>
        <div className="subtitle">
            <span>Основные понятия, примеры использования и лучшие практики по языку структурированных запросов</span>
        </div>
        <div className="content">
            <div className="title">Содержание</div>
            <div className="description">
                Первые 3 главы посвящены базовому владению SQL. <br />
                Начиная с 5 расскрываются про ... и ...
            </div>
        </div>
    </div>
  </div>
);

export default HandbookContent;
