import React, { Component } from 'react';

import './Table.scss';

class Table extends Component {
    getData() {
        const { rows, fields } = this.props;

        return rows.map((row, index) => (
            <div className="row" key={index}>
                {fields.map((field, index) => (
                    <div className="data" key={index}>
                        {row[field]}
                    </div>
                ))}
            </div>
        ));
    }

    getFields() {
        const { fields } = this.props;

        return fields.map((field, index) => (
            <div className="field" key={index}>
                {field}
            </div>
        ));
    }

    render() {
        const { className } = this.props;
        return (
            <div className={className || ''}>
                <div className="fields">{this.getFields()}</div>
                <div className="rows">{this.getData()}</div>
            </div>
        );
    }
}

export default Table;
