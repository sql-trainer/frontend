import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Collapsible from 'react-collapsible';

const Panel = props => {
    return (
        <Collapsible
            className="table"
            openedClassName="table"
            triggerClassName="table-title"
            triggerOpenedClassName="table-title"
            contentInnerClassName="table-props"
            trigger={props.trigger}
        >
            {props.children}
        </Collapsible>
    );
};

class Database extends PureComponent {
    render() {
        const { database, isDatabaseLoading } = this.props;

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
                            <Panel trigger={table.title} className="table" key={index}>
                                {table.props.map((prop, index) => (
                                    <div className={`table-prop ${prop.isKey ? 'key' : ''}`} key={index}>
                                        <div>{prop.name}</div>
                                        <div>{prop.type.toUpperCase()}</div>
                                    </div>
                                ))}
                            </Panel>
                        );
                    })}
            </div>
        );
    }
}

export default Database;
