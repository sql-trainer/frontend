import React, { PureComponent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

const Panel = props => {
    const [opened, setOpened] = useState(false);

    return (
        <div
            className={classNames('panel', props.panelClassName)}
            onClick={e => props.scrollRef.current.updateScroll()}
            data-opened={opened}
        >
            <div className={classNames('panel-title', props.panelTitleClassName)} onClick={e => setOpened(!opened)}>
                {props.title}
            </div>
            <div
                className={classNames('panel-body', props.panelBodyClassName)}
                style={{ display: opened ? 'block' : 'none' }}
            >
                {props.children}
            </div>
        </div>
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
                            <Panel
                                title={table.title}
                                panelClassName="table"
                                panelTitleClassName="table-title"
                                panelBodyClassName="table-props"
                                key={table.title}
                                scrollRef={this.props.scrollRef}
                            >
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
