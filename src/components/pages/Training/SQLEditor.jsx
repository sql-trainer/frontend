import React, { Component } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';

import store from '../../../modules/store';

import 'prismjs/themes/prism.css';

class SQLEditor extends Component {
    state = {
        saveTimeoutID: undefined,
    };

    handleContentEditable = value => {
        const { changeTabHtml, currTabIndex } = this.props;
        changeTabHtml(currTabIndex, value);
    };

    highlightSQL = sql => {
        sql = Prism.highlight(sql, Prism.languages.sql);
        return sql;
    };

    saveOnEdit = () => {
        const { questions } = this.props;
        const { saveTimeoutID } = this.state;

        if (saveTimeoutID !== undefined) {
            clearTimeout(saveTimeoutID);
        }

        const timeoutID = setTimeout(() => store.set('questions', questions), 1000);

        this.setState({ saveTimeoutID: timeoutID });
    };

    render() {
        const { currTab } = this.props;

        return (
            <Editor
                value={currTab.html}
                onValueChange={code => this.handleContentEditable(code)}
                highlight={code => this.highlightSQL(code)}
                className="textarea"
                tabSize={4}
                onKeyUp={this.saveOnEdit}
                placeholder="Введите свой запрос..."
            />
        );
    }
}

export default SQLEditor;
