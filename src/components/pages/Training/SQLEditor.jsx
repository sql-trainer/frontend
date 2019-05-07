import React, { Component } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import classNames from 'classnames';
import getCaretCoordinates from 'textarea-caret';
import { HotKeys } from 'react-hotkeys';

import store from '../../../modules/store';

class SQLEditor extends Component {
    state = {
        saveTimeoutID: undefined,
        recommendations: [],
        boundaries: [],
        position: [20, 10],
        searchString: '',
        selectPosition: 0,
    };

    SQLKeywordsDesc = {
        select: { type: 'keyword', info: '<a href="/handbook/select/"></a>', star: true },
        from: { type: 'keyword' },
        as: { type: 'keyword' },
        insert: { type: 'keyword' },
        into: { type: 'keyword' },
        values: { type: 'keyword' },
        update: { type: 'keyword' },
        delete: { type: 'keyword' },
        set: { type: 'function' },
        year: { type: 'function' },
    };

    SQLKeywords = Object.keys(this.SQLKeywordsDesc);

    handleContentEditable = value => {
        const { changeTabHtml, currTabIndex, questions, currQuestionIndex, changeSQLResponseType } = this.props;
        changeTabHtml(currTabIndex, value, questions[currQuestionIndex].id);
        changeSQLResponseType('', currTabIndex, questions[currQuestionIndex].id);
    };

    getLeftBoundary = (cursorPos, textContent, boundary = /[ \n\r]/) => {
        let startPos = cursorPos - 1;
        while (startPos > 0 && !boundary.test(textContent[startPos - 1])) startPos--;
        return startPos;
    };

    filterKeywords = e => {
        const forbiddenCodes = [37, 39, 9];
        const forbiddenCodes1 = [38, 40];

        if (forbiddenCodes.includes(e.which)) {
            this.setState({ recommendations: [] });
            return false;
        }

        if (forbiddenCodes1.includes(e.which)) {
            return false;
        }

        const inputEl = e.target;
        const textContent = inputEl.textContent;
        const cursorPos = inputEl.selectionStart;

        const caret = getCaretCoordinates(inputEl, cursorPos);

        const leftBoundary = this.getLeftBoundary(cursorPos, textContent);

        const substr = textContent.slice(leftBoundary, cursorPos);

        this.setState({
            recommendations:
                substr === ''
                    ? []
                    : this.SQLKeywords.filter(keyword => keyword !== substr && keyword.startsWith(substr)),
            boundaries: [leftBoundary, cursorPos],
            position: [caret.left, caret.top],
            searchString: substr,
            selectPosition: 0,
        });
    };

    insertKeyword = keyword => {
        const { boundaries } = this.state;

        const inputEl = document.querySelector('.npm__react-simple-code-editor__textarea');
        inputEl.focus();

        const cursorPos = boundaries[1];

        const isKeywordFunction = this.SQLKeywordsDesc[keyword].type === 'function';

        const textToInsert = keyword.slice(cursorPos - boundaries[0]) + (isKeywordFunction ? '()' : '');

        const isSuccess = document.execCommand('insertText', false, textToInsert);

        if (!isSuccess && typeof inputEl.setRangeText === 'function') {
            inputEl.setRangeText(textToInsert);
            inputEl.selectionStart = inputEl.selectionEnd = cursorPos + textToInsert.length;

            const e = new Event('input');
            inputEl.dispatchEvent(e);
        }

        if (isKeywordFunction) inputEl.setSelectionRange(inputEl.selectionStart - 1, inputEl.selectionStart - 1);

        this.setState({ recommendations: [] });
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

    changeSelectPosition = (e, direction) => {
        e.preventDefault();

        const { recommendations, selectPosition } = this.state;

        if (recommendations.length) {
            const position =
                selectPosition + direction < 0
                    ? recommendations.length - 1
                    : selectPosition + direction >= recommendations.length
                    ? 0
                    : direction + selectPosition;

            this.setState({ selectPosition: position });
        }
    };

    render() {
        const { currTab, editorTheme, currTables } = this.props;
        const { recommendations, position, searchString, selectPosition } = this.state;

        const autocompletionKeys = {
            UP: 'up',
            DOWN: 'down',
            TAB: 'tab',
        };

        const autocompletionHandlers = {
            UP: e => this.changeSelectPosition(e, -1),
            DOWN: e => this.changeSelectPosition(e, 1),
            TAB: e => {
                e.preventDefault();
                e.stopPropagation();
                recommendations.length && this.insertKeyword(recommendations[selectPosition]);
            },
        };

        return (
            <>
                {recommendations && (
                    <div
                        className="autocompletion"
                        style={{ transform: `translate(${position[0]}px, ${position[1] + 20}px)` }}
                    >
                        {recommendations.map((r, index) => (
                            <div
                                key={index}
                                onClick={e => this.insertKeyword(r)}
                                className={classNames({
                                    selected: selectPosition === index,
                                    star: this.SQLKeywordsDesc[r].star,
                                })}
                            >
                                <b>{r.slice(0, searchString.length)}</b>
                                {r.slice(searchString.length)}
                                {this.SQLKeywordsDesc[r] && this.SQLKeywordsDesc[r].type === 'function' ? '()' : ''}
                            </div>
                        ))}
                    </div>
                )}

                <HotKeys keyMap={autocompletionKeys} handlers={autocompletionHandlers}>
                    <Editor
                        value={currTab.html}
                        onValueChange={code => this.handleContentEditable(code)}
                        highlight={code => this.highlightSQL(code)}
                        className={classNames('textarea', editorTheme)}
                        tabSize={4}
                        placeholder="Введите свой запрос..."
                        onKeyUp={this.filterKeywords}
                        autoFocus
                    />
                </HotKeys>
            </>
        );
    }
}

export default SQLEditor;
