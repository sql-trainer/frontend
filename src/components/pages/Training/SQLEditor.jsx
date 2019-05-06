import React, { Component } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import classNames from 'classnames';

import store from '../../../modules/store';

class SQLEditor extends Component {
    state = {
        saveTimeoutID: undefined,
    };

    handleContentEditable = value => {
        const { changeTabHtml, currTabIndex, questions, currQuestionIndex, changeSQLResponseType } = this.props;
        changeTabHtml(currTabIndex, value, questions[currQuestionIndex].id);
        changeSQLResponseType('', currTabIndex, questions[currQuestionIndex].id);
    };

    highlightSQL = sql => {
        sql = Prism.highlight(sql, Prism.languages.sql);
        return sql;
    };

    saveOnEdit = () => {
        const { tabs } = this.props;
        const { saveTimeoutID } = this.state;

        if (saveTimeoutID !== undefined) {
            clearTimeout(saveTimeoutID);
        }

        const timeoutID = setTimeout(() => store.set('tabs', tabs), 1000);

        this.setState({ saveTimeoutID: timeoutID });
    };

    render() {
        const { currTab, editorTheme } = this.props;

        return (
            <>
                <Editor
                    value={currTab.html}
                    onValueChange={code => this.handleContentEditable(code)}
                    highlight={code => this.highlightSQL(code)}
                    className={classNames('textarea', editorTheme)}
                    tabSize={4}
                    // onKeyUp={this.saveOnEdit}
                    placeholder="Введите свой запрос..."
                />
            </>
        );
    }
}

export default SQLEditor;
