import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

class NotFound extends Component {
    componentDidMount() {
        document.title = 'Страница не найдена';
    }

    render() {
        return (
            <div className="page-404">
                <h1>404</h1>
                <h2>
                    К сожалению, нужная вам страница не найдена, но зато <Link to="/training/">тренажёр</Link> и{' '}
                    <Link to="/handbook/">справочник</Link> точно есть.
                </h2>
            </div>
        );
    }
}

export default NotFound;
