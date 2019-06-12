import React, { Component } from 'react';

import './index.scss';

class HandbookPlaceholder extends Component {
    componentDidMount() {
        document.title = 'Справочник';
    }

    render() {
        return (
            <div className="page-404">
                <h2>Раздел в разработке.</h2>
            </div>
        );
    }
}

export default HandbookPlaceholder;
