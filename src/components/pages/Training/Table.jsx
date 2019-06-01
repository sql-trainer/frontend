import React, { Component } from 'react';

import './styles/Table.scss';

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
        const { className, fields } = this.props;

        return (
            <>
                <style>
                    {`.fields, .row {
                        grid-template-columns: repeat(${fields.length}, minmax(80px, 1fr));
                    }`}
                </style>
                <div className={className || ''}>
                    <div className="fields">{this.getFields()}</div>
                    <div className="rows">{this.getData()}</div>
                </div>
            </>
        );
    }
}

export default Table;
