import React from "react";
import { Link } from 'react-router-dom';

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
							<Link to="handbook/intro-in-sql">
								1.1 Введение в SQL 
							</Link>
						</li>
						<li>
							<Link to="handbook/intro-in-sql">
								1.2 Основные понятия 
							</Link>
						</li>
						<li>
							<Link to="handbook/intro-in-sql">
								1.3 SQL Базы данных 
							</Link>
						</li>
						<li>
							<Link to="handbook/intro-in-sql">
								1.4 Основные понятия 
							</Link>
						</li>
						<li>
							<Link to="handbook/intro-in-sql">
								1.5 SQL Базы данных 
							</Link>
						</li>
					</ul>
				</div>
				<div className="list__item">
					<div className="title">Основные типы данных</div>
					<ul className="list__sub">
						<li>
							<Link to="handbook/intro-in-sql">
								2.1 Строки и символы 
							</Link>
						</li>
						<li>
							<Link to="handbook/intro-in-sql">
								2.2 Числовые типы
							</Link>
						</li>
						<li>
							<Link to="handbook/intro-in-sql">
								2.3 Дата и время
							</Link>
						</li>
						<li>
							<Link to="handbook/intro-in-sql">
								2.4 Неопределенные или пропущенные значения
							</Link>
						</li>
						<li>
							<Link to="handbook/intro-in-sql">
								2.5 Строки и символы 
							</Link>
						</li>
						<li>
							<Link to="handbook/intro-in-sql">
								2.6 Числовые типы
							</Link>
						</li>
						<li>
							<Link to="handbook/intro-in-sql">
								2.7 Дата и время
							</Link>
						</li>
						<li>
							<Link to="handbook/intro-in-sql">
								2.8 Неопределенные или пропущенные значения
							</Link>
						</li>
					</ul>
				</div>
			</div>		
		</section>
  	</div>
);

export default HandbookContent;
