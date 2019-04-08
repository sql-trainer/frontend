import React, { Component } from 'react';
import classNames from 'classnames';

class CheckButton extends Component {
    render() {
        const { checkResponseType, questions, currQuestion, currTab, checkSQL } = this.props;

        const className = classNames(
            { solved: questions.length && currQuestion.status === 'solved' },
            'check-sql',
            checkResponseType,
        );

        const isDisabled = !questions.length || currTab.loading || checkResponseType || !currTab.html;

        return <button className={className} onClick={checkSQL} disabled={isDisabled} data-loading={currTab.loading} />;
    }
}

export default CheckButton;
