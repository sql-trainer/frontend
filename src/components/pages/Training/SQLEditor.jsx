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
    handleContentEditable = value => {
        const {
            changeTabHtml,
            currTabIndex,
            questions,
            currQuestionIndex,
            changeSQLResponseType,
            currTab,
        } = this.props;
        changeTabHtml(currTabIndex, value, questions[currQuestionIndex].id);
        if (currTab.SQLResponseType !== '') changeSQLResponseType('', currTabIndex, questions[currQuestionIndex].id);
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
    };

    insertTransformation = keyword => (keyword.type !== 'table' ? keyword.label.toUpperCase() : keyword.label);

    render() {
        const { currTab, editorTheme, keywords, options, visible, changeVisibility } = this.props;

        return (
            <Autocompletion
                value={currTab.html}
                keywords={keywords}
                options={options}
                inputElementID="autocompletion-textarea"
                insertTransformation={this.insertTransformation}
                scrollRef={this.inputScrollRef}
                visible={visible}
                visibleHandler={changeVisibility}
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
