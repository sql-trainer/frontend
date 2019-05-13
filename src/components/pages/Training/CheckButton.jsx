import React, { PureComponent } from 'react';

class CheckButton extends PureComponent {
    _checkSQL = e => {
        const { checkSQL, currTabIndex, currQuestionIndex } = this.props;
        checkSQL(currQuestionIndex, currTabIndex);
    };

    render() {
        const { questions, currTab } = this.props;

        const isDisabled = !questions.length || currTab.loading || !currTab.html;

        return (
            <button
                className="check-sql"
                onClick={this._checkSQL}
                disabled={isDisabled}
                data-loading={currTab.loading}
            />
        );
    }
}

export default CheckButton;
