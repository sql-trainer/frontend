import React, { Component } from 'react';

import './styles/Table.scss';

class Table extends Component {
    tooltipRef = React.createRef();

    mouseOver = (e, value) => {
        console.log(e.target);

        this.tooltipRef.current.textContent = value;
        this.tooltipRef.current.style = `transform: translate(${e.target.offsetLeft}px, ${
            e.target.offsetTop
        }px); min-width: ${e.target.offsetWidth - 20}px`;
    };

    getData() {
        const { rows, fields } = this.props;

        return rows.map((row, index) => (
            <div
                className="row"
                key={index}
                style={{ gridTemplateColumns: `repeat(${fields.length}, minmax(80px, 1fr))` }}
            >
                {fields.map((field, index) => (
                    <div
                        className="data"
                        key={index}
                        data-value={row[field]}
                        onMouseOver={e => {
                            const f = this.mouseOver(e, row[field]);
                            setTimeout(f, 200);
                        }}
                    >
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
                <div className={className || ''}>
                    <div
                        className="fields"
                        style={{ gridTemplateColumns: `repeat(${fields.length}, minmax(80px, 1fr))` }}
                    >
                        {this.getFields()}
                    </div>
                    <div className="rows">{this.getData()}</div>
                </div>
                <div className="table-tooltip" ref={this.tooltipRef}>
                    asd
                </div>
            </>
        );
    }
}

export default Table;
