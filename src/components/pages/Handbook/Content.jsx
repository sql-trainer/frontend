import React from "react";

const HandbookContent = props => (
  	<div className="content">
		<section className="section">
			<div className="description">
				<h2>Язык SQL</h2>
				<p>
					Это часть позволит разобраться в структуре SQL запросах, подтянуть
					существующие знания.
				</p>
				<p>
					В рамках справочника мы пытали не опираться на конкретные SQL, а
					использовать наиболее общие подхходы и средства реляционных баз данных.
				</p>
			</div>

			<div className="list">
				<div className="list__item">
					<div className="title">Введение</div>
					<ul className="list__sub">
						<li>
							<a href="/">1.1 Введение в SQL </a>
						</li>
						<li>
							<a href="/">1.2 Основные понятия </a>
						</li>
						<li>
							<a href="/">1.3 SQL Базы данных </a>
						</li>
						<li>
							<a href="/">1.4 Основные понятия </a>
						</li>
						<li>
							<a href="/">1.5 SQL Базы данных </a>
						</li>
					</ul>
				</div>
				<div className="list__item">
					<div className="title">Основные типы данных</div>
					<ul className="list__sub">
						<li>
							<a href="/">2.1 Строки и символы </a>
						</li>
						<li>
							<a href="/">2.2 Числовые типы</a>
						</li>
						<li>
							<a href="/">2.3 Дата и время</a>
						</li>
						<li>
							<a href="/">2.4 Неопределенные или пропущенные значения</a>
						</li>
						<li>
							<a href="/">2.5 Строки и символы </a>
						</li>
						<li>
							<a href="/">2.6 Числовые типы</a>
						</li>
						<li>
							<a href="/">2.7 Дата и время</a>
						</li>
						<li>
							<a href="/">2.8 Неопределенные или пропущенные значения</a>
						</li>
					</ul>
				</div>
			</div>		
		</section>
  	</div>
);

export default HandbookContent;
