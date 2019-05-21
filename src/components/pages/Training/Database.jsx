import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Panel from '../../common/Panel';

const CustomPanel = props => (
    <Panel panelClassName="table" panelTitleClassName="table-title" panelBodyClassName="table-props" {...props} />
);

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
                            <CustomPanel title={table.title} key={table.title} scrollRef={this.props.scrollRef}>
                                {table.props.map((prop, index) => (
                                    <div className={`table-prop ${prop.isKey ? 'key' : ''}`} key={index}>
                                        <div>{prop.name}</div>
                                        <div>{prop.type.toUpperCase()}</div>
                                    </div>
                                ))}
                            </CustomPanel>
                        );
                    })}
            </div>
        );
    }
}

export default Database;
