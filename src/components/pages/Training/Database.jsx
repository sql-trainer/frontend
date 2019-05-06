import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Database extends Component {
    render() {
        const { database, isDatabaseLoading, changeTableActivity } = this.props;

        return (
            <div className="tablesbox" data-loading={isDatabaseLoading}>
                <div className="title">
                    Схема базы данных
                    <a href="/">
                        <FontAwesomeIcon
                            icon="sitemap"
                            className="db-diagram-icon"
                            data-tip="Подробная схема базы данных"
                        />
                    </a>
                </div>
                {database !== undefined &&
                    database.tables.map((table, index) => {
                        return (
                            <div className="table" key={index}>
                                <div
                                    className={`table-title ${table.active ? 'active' : ''}`}
                                    onClick={e => changeTableActivity(index)}
                                >
                                    {table.title}
                                </div>
                                <div className={`table-props ${table.active ? 'active' : ''}`}>
                                    {table.props.map((prop, index) => (
                                        <div className={`table-prop ${prop.isKey ? 'key' : ''}`} key={index}>
                                            <div>{prop.name}</div>
                                            <div>{prop.type.toUpperCase()}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
            </div>
        );
    }
}

export default Database;
