import React, { Component } from 'react';
import Editor from 'react-simple-code-editor';
// import Prism from 'prismjs';
// import 'prismjs/components/prism-sql';
import classNames from 'classnames';
import CustomScrollbars from './CustomScrollbars';

import refractor from 'refractor/core.js';
import sql from 'refractor/lang/sql.js';

import Autocompletion from '../../common/Autocompletion';

refractor.register(sql);

class SQLEditor extends Component {
    constructor(props) {
        super(props);
        const { currTables } = props;

        this.keywords = [
            {
                label: 'select',
                snippets: [
                    { label: 'select * from …', type: 'snippet' },
                    { label: 'select * from … where …', type: 'snippet' },
                ],
            },
            { label: 'from' },
            { label: 'group', snippets: [{ label: 'group by …' }] },
            { label: 'by' },
            { label: 'inner' },
            { label: 'full' },
            { label: 'left' },
            { label: 'right' },
            { label: 'join' },
            { label: 'where' },
            { label: 'as' },
            { label: 'insert' },
            { label: 'into' },
            { label: 'values' },
            { label: 'update' },
            { label: 'delete' },
            { label: 'set' },
            { label: 'and' },
            { label: 'or' },
            { label: 'on' },
            { label: 'year', type: 'function' },
            { label: 'create' },
            ...currTables.map(t => ({ label: t, type: 'table' })),
        ];

        this.insertTransformation = keyword => (keyword.type !== 'table' ? keyword.label.toUpperCase() : keyword.label);

        this.options = {
            insertSpaceAfterKeyword: true,
            insertBracketsAfterFunction: true,
        };
    }

    handleContentEditable = value => {
        const { changeTabHtml, currTabIndex, questions, currQuestionIndex, changeSQLResponseType } = this.props;
        changeTabHtml(currTabIndex, value, questions[currQuestionIndex].id);
        changeSQLResponseType('', currTabIndex, questions[currQuestionIndex].id);
    };

    createReactElements = nodes =>
        nodes.map((node, index) =>
            node.type === 'text'
                ? node.value
                : React.createElement(
                      node.tagName,
                      { className: node.properties.className.join(' '), key: index },
                      this.createReactElements(node.children),
                  ),
        );

    highlightSQL = sql => {
        const nodes = refractor.highlight(sql, 'sql');
        return this.createReactElements(nodes);

        // return Prism.highlight(sql, Prism.languages.sql);
    };

    render() {
        const { currTab, editorTheme } = this.props;

        return (
            <Autocompletion
                value={currTab.html}
                keywords={this.keywords}
                options={this.options}
                inputElementID="autocompletion-textarea"
                insertTransformation={this.insertTransformation}
                scrollRef={this.inputScrollRef}
            >
                {(onKeyUp, onPositionChange) => (
                    <CustomScrollbars
                        className={classNames('textarea-scrollbar', 'indicator', currTab.SQLResponseType)}
                        ref={ref => (this.inputScrollRef = ref)}
                        onScroll={onPositionChange}
                        prefix="editor"
                    >
                        <Editor
                            value={currTab.html}
                            onValueChange={code => this.handleContentEditable(code)}
                            onKeyUp={onKeyUp}
                            highlight={code => this.highlightSQL(code)}
                            className={classNames('textarea', editorTheme)}
                            tabSize={4}
                            placeholder="Введите свой запрос..."
                            textareaId="autocompletion-textarea"
                            onClick={onPositionChange}
                            autoFocus
                        />
                    </CustomScrollbars>
                )}
            </Autocompletion>
        );
    }
}

export default SQLEditor;
