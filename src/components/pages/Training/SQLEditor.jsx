import React, { Component } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import classNames from 'classnames';
// import getCaretCoordinates from 'textarea-caret';
// import { HotKeys } from 'react-hotkeys';

import Autocompletion from '../../common/Autocompletion';

class SQLEditor extends Component {
    constructor(props) {
        super(props);
        const { currTables } = props;

        this.keywords = {
            select: { info: '<a href="/handbook/select/">SELECT help</a>', star: true },
            from: {},
            'group by': {},
            'inner join': {},
            'full join': {},
            'left join': {},
            'right join': {},
            where: {},
            as: {},
            insert: {},
            into: {},
            values: {},
            update: {},
            delete: {},
            set: {},
            and: {},
            or: {},
            on: {},
            year: { type: 'function' },
        };

        currTables.forEach(t => (this.keywords[t] = { type: 'table' }));

        this.options = {};
    }

    handleContentEditable = value => {
        const { changeTabHtml, currTabIndex, questions, currQuestionIndex, changeSQLResponseType } = this.props;
        changeTabHtml(currTabIndex, value, questions[currQuestionIndex].id);
        changeSQLResponseType('', currTabIndex, questions[currQuestionIndex].id);
    };

    highlightSQL = sql => {
        sql = Prism.highlight(sql, Prism.languages.sql);
        return sql;
    };

    render() {
        const { currTab, editorTheme } = this.props;

        return (
            <Autocompletion value={currTab.html} keywords={this.keywords} options={this.options}>
                <Editor
                    onValueChange={code => this.handleContentEditable(code)}
                    highlight={code => this.highlightSQL(code)}
                    className={classNames('textarea', editorTheme)}
                    tabSize={4}
                    placeholder="Введите свой запрос..."
                    autoFocus
                />
            </Autocompletion>
        );
    }
}

export default SQLEditor;
