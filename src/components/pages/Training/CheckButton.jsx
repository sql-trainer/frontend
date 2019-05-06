import React, { Component } from 'react';
import classNames from 'classnames';

class CheckButton extends Component {
    render() {
        const { questions, currQuestion, currTab, checkSQL, currTabIndex, currQuestionIndex } = this.props;

        const className = classNames({ solved: questions.length && currQuestion.status === 'solved' }, 'check-sql');

        const isDisabled = !questions.length || currTab.loading || !currTab.html;

        return (
            <button
                className={className}
                onClick={e => checkSQL(currQuestionIndex, currTabIndex)}
                disabled={isDisabled}
                data-loading={currTab.loading}
            />
        );
    }
}

export default CheckButton;
