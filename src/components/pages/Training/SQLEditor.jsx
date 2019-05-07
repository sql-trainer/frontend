import React, { Component } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import classNames from 'classnames';
import getCaretCoordinates from 'textarea-caret';
import { HotKeys } from 'react-hotkeys';

import store from '../../../modules/store';

class SQLEditor extends Component {
    constructor(props) {
        super(props);
        props.currTables.forEach(t => (this.SQLKeywordsDesc[t] = { type: 'table' }));
        this.SQLKeywords = Object.keys(this.SQLKeywordsDesc);
    }

    state = {
        saveTimeoutID: undefined,
        keywordList: [],
        position: [20, 10],
        searchString: '',
        selectPosition: 0,
    };

    SQLKeywordsDesc = {
        select: { type: 'keyword', info: '<a href="/handbook/select/"></a>', star: true },
        from: {},
        'group by': {},
        where: {},
        as: {},
        insert: {},
        into: {},
        values: {},
        update: {},
        delete: {},
        set: {},
        year: { type: 'function' },
    };

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
        const forbiddenCodes = { clear: [37, 39, 9], prevent: [38, 40] };

        if (forbiddenCodes.clear.includes(e.which)) return this.setState({ keywordList: [] });
        if (forbiddenCodes.prevent.includes(e.which)) return false;

        const inputEl = e.target;
        const textContent = inputEl.textContent;
        const cursorPos = inputEl.selectionStart;

        const caret = getCaretCoordinates(inputEl, cursorPos);

        const leftBoundary = this.getLeftBoundary(cursorPos, textContent);

        const searchString = textContent.slice(leftBoundary, cursorPos).toLowerCase();

        this.setState({
            keywordList:
                searchString === ''
                    ? []
                    : this.SQLKeywords.filter(keyword => {
                          keyword = keyword.toLowerCase();
                          return keyword !== searchString && keyword.startsWith(searchString);
                      }),
            position: [caret.left, caret.top],
            selectPosition: 0,
            searchString,
        });
    };

    insertKeyword = keyword => {
        const { searchString } = this.state;

        const inputEl = document.querySelector('.npm__react-simple-code-editor__textarea');
        inputEl.focus();

        const cursorPos = inputEl.selectionStart;

        const isKeywordFunction = this.SQLKeywordsDesc[keyword].type === 'function';
        const textToInsert = keyword + (isKeywordFunction ? '()' : '') + ' ';

        inputEl.setSelectionRange(cursorPos - searchString.length, cursorPos);
        const isSuccess = document.execCommand('insertText', false, textToInsert);

        if (!isSuccess && typeof inputEl.setRangeText === 'function') {
            inputEl.setRangeText(textToInsert);
            inputEl.selectionStart = inputEl.selectionEnd = cursorPos + textToInsert.length;
            const e = new Event('UIEvent');
            e.initEvent('input', true, false);
            inputEl.dispatchEvent(e);
        }

        if (isKeywordFunction) inputEl.setSelectionRange(inputEl.selectionStart - 2, inputEl.selectionStart - 2);

        this.setState({ keywordList: [] });
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

        const { keywordList, selectPosition } = this.state;

        if (keywordList.length) {
            const position =
                selectPosition + direction < 0
                    ? keywordList.length - 1
                    : selectPosition + direction >= keywordList.length
                    ? 0
                    : direction + selectPosition;

            this.setState({ selectPosition: position });
        }
    };

    autocompletionKeys = {
        UP: 'up',
        DOWN: 'down',
        TAB: 'tab',
    };

    autocompletionHandlers = {
        UP: e => this.changeSelectPosition(e, -1),
        DOWN: e => this.changeSelectPosition(e, 1),
        TAB: e => {
            if (this.state.keywordList.length) {
                e.preventDefault();
                e.stopPropagation();
                this.insertKeyword(this.state.keywordList[this.state.selectPosition]);
            }
        },
    };

    render() {
        const { currTab, editorTheme } = this.props;
        const { keywordList, position, searchString, selectPosition } = this.state;

        return (
            <>
                {keywordList && (
                    <div
                        className="autocompletion"
                        style={{ transform: `translate(${position[0]}px, ${position[1] + 20}px)` }}
                    >
                        {keywordList.map((keyword, index) => (
                            <div
                                key={index}
                                onClick={e => this.insertKeyword(keyword)}
                                className={classNames('keyword', {
                                    selected: selectPosition === index,
                                    star: this.SQLKeywordsDesc[keyword].star,
                                })}
                            >
                                <div
                                    className={classNames('keyword-type', {
                                        table: this.SQLKeywordsDesc[keyword].type === 'table',
                                    })}
                                />
                                <div className="keyword-text">
                                    <b>{keyword.slice(0, searchString.length)}</b>
                                    {keyword.slice(searchString.length)}
                                </div>
                                {this.SQLKeywordsDesc[keyword].type === 'function' ? '()' : ''}
                                {this.SQLKeywordsDesc[keyword].info && <div className="keyword-info" />}
                            </div>
                        ))}
                    </div>
                )}

                <HotKeys keyMap={this.autocompletionKeys} handlers={this.autocompletionHandlers}>
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
