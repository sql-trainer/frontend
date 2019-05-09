import React, { Component } from 'react';
import classNames from 'classnames';
import getCaretCoordinates from 'textarea-caret';
import { HotKeys } from 'react-hotkeys';

class Autocompletion extends Component {
    state = {
        keywordList: [],
        blockPosition: [20, 10],
        searchString: '',
        selectedPosition: 0,
    };

    static defaultProps = {
        currTables: [],
        keywords: {},
        options: {},
        insertTransformation: keyword => keyword,
        filterCondition: function(keyword, searchString, options) {
            let keywordL = keyword.label;
            let searchStringL = searchString;

            if (!options.exactMatch) {
                keywordL = keywordL.toLowerCase();
                searchStringL = searchStringL.toLowerCase();
            }

            return keywordL.startsWith(searchStringL);
        },
    };

    componentDidMount() {
        this.inputElement = document.querySelector(`#${this.props.inputElementID}`);
    }

    getLeftBoundary = (cursorPos, textContent, boundary = /[^\w]/) => {
        let startPos = cursorPos - 1;
        while (startPos > 0 && !boundary.test(textContent[startPos - 1])) startPos--;
        return startPos;
    };

    filterKeywords = e => {
        const { filterCondition, keywords, options } = this.props;

        const forbiddenCodes = { clear: [37, 39, 9, 17], prevent: [38, 40] };

        if (forbiddenCodes.clear.includes(e.which)) return this.setState({ keywordList: [] });
        if (forbiddenCodes.prevent.includes(e.which)) return false;

        const inputEl = e.target;
        const textContent = inputEl.textContent;
        const cursorPos = inputEl.selectionStart;

        if (/\w/.test(textContent[cursorPos]) && cursorPos !== textContent.length)
            return this.setState({ keywordList: [] });

        const caret = getCaretCoordinates(inputEl, cursorPos);
        const leftBoundary = this.getLeftBoundary(cursorPos, textContent);
        const searchString = textContent.slice(leftBoundary, cursorPos);

        const filteredKeywords =
            searchString === '' ? [] : keywords.filter(keyword => filterCondition(keyword, searchString, options));

        const keywordList = filteredKeywords;

        filteredKeywords.forEach(f => (f.snippets ? keywordList.push(...f.snippets) : false));

        this.setState({ keywordList, blockPosition: caret, searchString, selectedPosition: 0, cursorPos });
    };

    buildNewString = keyword => {
        const {
            options: { insertBracketsAfterFunction, insertSpaceAfterKeyword },
            insertTransformation,
        } = this.props;

        const isKeywordFunction = keyword.type === 'function';

        let textToInsert = keyword.insert
            ? keyword.insert
            : keyword.transform
            ? insertTransformation(keyword)
            : keyword.label;

        if (insertBracketsAfterFunction) textToInsert += isKeywordFunction ? '()' : '';
        if (insertSpaceAfterKeyword) textToInsert += ' ';

        return textToInsert;
    };

    getCursorOffsetAfterInsert = keyword => {
        const {
            options: { insertBracketsAfterFunction, insertSpaceAfterKeyword },
        } = this.props;

        let newCursorPosition = 0;

        if (keyword.type === 'function') {
            if (insertBracketsAfterFunction) {
                newCursorPosition -= 1;
                if (insertSpaceAfterKeyword) newCursorPosition -= 1;
            }
        }

        return newCursorPosition;
    };

    insertKeyword = keyword => {
        const { value } = this.props;

        const inputEl = this.inputElement;
        inputEl.focus();

        const cursorPosition = inputEl.selectionStart;
        const leftBoundary = this.getLeftBoundary(cursorPosition, value);

        const textToInsert = this.buildNewString(keyword);

        inputEl.setSelectionRange(leftBoundary, cursorPosition);
        const isSuccess = document.execCommand('insertText', false, textToInsert);

        if (!isSuccess && typeof inputEl.setRangeText === 'function') {
            inputEl.setRangeText(textToInsert);
            inputEl.selectionStart = inputEl.selectionEnd = cursorPosition + textToInsert.length;
            const e = new Event('UIEvent');
            e.initEvent('input', true, false);
            inputEl.dispatchEvent(e);
        }

        const newCursorPosition = inputEl.selectionStart + this.getCursorOffsetAfterInsert(keyword);
        inputEl.setSelectionRange(newCursorPosition, newCursorPosition);

        this.setState({ keywordList: [] });
    };

    changeSelectedPosition = (e, direction) => {
        const { keywordList, selectedPosition } = this.state;

        if (keywordList.length) {
            e.preventDefault();
            const blockPosition =
                selectedPosition + direction < 0
                    ? keywordList.length - 1
                    : selectedPosition + direction >= keywordList.length
                    ? 0
                    : direction + selectedPosition;

            this.setState({ selectedPosition: blockPosition });
        }
    };

    onPositionChange = type => {
        const { cursorPos } = this.state;
        const inputEl = this.inputElement;
        inputEl.focus();

        const cursorPosition = inputEl.selectionStart;
        if (cursorPos !== cursorPosition || type === 'scroll') this.setState({ keywordList: [] });
    };

    autocompletionKeys = {
        UP: 'up',
        DOWN: 'down',
        TAB: 'tab',
    };

    autocompletionHandlers = {
        UP: e => this.changeSelectedPosition(e, -1),
        DOWN: e => this.changeSelectedPosition(e, 1),
        TAB: e => {
            if (this.state.keywordList.length) {
                e.preventDefault();
                e.stopPropagation();
                this.insertKeyword(this.state.keywordList[this.state.selectedPosition]);
            }
        },
    };

    getKeywordList = () => {
        const { selectedPosition, searchString, keywordList } = this.state;

        return keywordList.map((keyword, index) => (
            <div
                key={index}
                onClick={e => this.insertKeyword(keyword)}
                className={classNames('keyword', { selected: selectedPosition === index, star: keyword.star })}
            >
                <div className={classNames('keyword-type', keyword.type)} />

                <div className="keyword-text">
                    {keyword.type === 'snippet' ? (
                        keyword.label
                    ) : (
                        <>
                            <b>{keyword.label.slice(0, searchString.length)}</b>
                            {keyword.label.slice(searchString.length)}
                        </>
                    )}
                </div>

                {keyword.info && <div className="keyword-info" />}
            </div>
        ));
    };

    render() {
        const { keywordList, blockPosition } = this.state;
        const { children, scrollRef } = this.props;

        const inputElScrollTop = (scrollRef && scrollRef.getScrollTop()) || 0;

        const autocompletionStyle = {
            transform: `translate(${blockPosition.left}px, ${blockPosition.top + 20 - inputElScrollTop}px)`,
        };

        return (
            <div>
                <div className="autocompletion" style={autocompletionStyle}>
                    {this.getKeywordList(keywordList)}
                </div>
                <HotKeys keyMap={this.autocompletionKeys} handlers={this.autocompletionHandlers}>
                    {children(this.filterKeywords, this.onPositionChange)}
                </HotKeys>
            </div>
        );
    }
}

export default Autocompletion;
