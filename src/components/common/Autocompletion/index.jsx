import React, { Component } from 'react';
import classNames from 'classnames';
import getCaretCoordinates from 'textarea-caret';
import { HotKeys } from 'react-hotkeys';

class Autocompletion extends Component {
    state = {
        keywordList: [],
        blockPosition: { left: 20, top: 30 },
        searchString: '',
        selectedPosition: 0,
    };

    //prettier-ignore
    forbiddenKeyCodes = new Set([37, 39, 17, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135])

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

    componentDidUpdate(prevProps) {
        if (this.props.isACAvailable === true && prevProps.isACAvailable === false) {
            this.inputElement = document.querySelector(`#${this.props.inputElementID}`);
        }

        if (prevProps.value !== this.props.value && this.props.isACAvailable === true && this.props.visible) {
            this.filterKeywords();
        }
    }

    getLeftBoundary = (cursorPos, textContent, boundary = /[^\w]/) => {
        let startPos = cursorPos;
        while (startPos > 0) {
            if (boundary.test(textContent[startPos - 1])) break;
            startPos--;
        }
        return startPos;
    };

    filterKeys = e => {
        const { visibleHandler, visible } = this.props;

        const { keywordList } = this.state;

        const isModified = e.altKey || e.shiftKey || e.metaKey || e.ctrlKey;
        if (!isModified) {
            if (visible && keywordList.length && e.which === 9) e.preventDefault();
            if (visible && keywordList.length && this.forbiddenKeyCodes.has(e.which)) visibleHandler(false);
        }
    };

    setBlockPosition = () => {
        const { scrollRef } = this.props;

        const inputEl = this.inputElement;
        const cursorPos = inputEl.selectionStart;

        const caret = getCaretCoordinates(inputEl, cursorPos);

        const inputElScrollTop = (scrollRef && scrollRef.getScrollTop()) || 0;
        caret.top += 20 - inputElScrollTop;

        if (this.acRef) {
            caret.left =
                caret.left + this.acRef.offsetWidth > this.acWrapperRef.offsetWidth
                    ? this.acWrapperRef.offsetWidth - this.acRef.offsetWidth - 10
                    : caret.left;
        }

        this.setState({ blockPosition: caret });
    };

    filterKeywords = e => {
        const { filterCondition, keywords, options } = this.props;
        let filteredKeywords;

        let kw = keywords;

        const inputEl = this.inputElement;
        const textContent = inputEl.textContent;
        const cursorPos = inputEl.selectionStart;

        if (/\w/.test(textContent[cursorPos]) && cursorPos !== textContent.length)
            return this.setState({ keywordList: [] });

        const leftBoundary = this.getLeftBoundary(cursorPos, textContent);
        const searchString = textContent.slice(leftBoundary, cursorPos);

        const delimiters = ['.'];
        const delimiter = delimiters.find(d => textContent.slice(leftBoundary - d.length, leftBoundary) === d);

        if (delimiter !== undefined) {
            const parent = textContent.slice(
                this.getLeftBoundary(leftBoundary - delimiter.length, textContent),
                leftBoundary - delimiter.length,
            );

            kw = keywords.find(k => k.label === parent);

            if (kw !== undefined) kw = kw.children ? kw.children[delimiter] || [] : [];
            else kw = [];

            filteredKeywords =
                searchString === '' ? kw : kw.filter(keyword => filterCondition(keyword, searchString, options));
        } else {
            filteredKeywords =
                searchString === '' ? [] : keywords.filter(keyword => filterCondition(keyword, searchString, options));
        }

        const keywordList = filteredKeywords;

        filteredKeywords.forEach((f, index) => (f.snippets ? keywordList.splice(index + 1, 0, ...f.snippets) : false));

        this.setState({ keywordList, searchString, selectedPosition: 0, cursorPos }, this.setBlockPosition);
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

        if (insertBracketsAfterFunction && isKeywordFunction) textToInsert += `(${(keyword.props || []).join(', ')})`;
        if ((insertSpaceAfterKeyword && keyword.insertSpace !== false) || keyword.insertSpace === true)
            textToInsert += ' ';

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
        const { value, visibleHandler } = this.props;

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

        const offset = this.getCursorOffsetAfterInsert(keyword);
        const newCursorPos = inputEl.selectionStart + offset;

        if (keyword.type === 'function' && keyword.highlightProps)
            inputEl.setSelectionRange(newCursorPos - keyword.props.join(', ').length, newCursorPos);
        else inputEl.setSelectionRange(newCursorPos, newCursorPos);

        visibleHandler(false);
    };

    changeSelectedPosition = (e, direction) => {
        const { keywordList, selectedPosition } = this.state;
        const { visible } = this.props;

        let blockPosition;

        if (keywordList.length && visible) {
            e.preventDefault();

            if (selectedPosition + direction < 0) blockPosition = keywordList.length - 1;
            else if (selectedPosition + direction >= keywordList.length) blockPosition = 0;
            else blockPosition = direction + selectedPosition;

            this.setState({ selectedPosition: blockPosition });
        }
    };

    onPositionChange = type => {
        const { cursorPos } = this.state;
        const { visibleHandler } = this.props;
        const inputEl = this.inputElement;
        inputEl.focus();

        const cursorPosition = inputEl.selectionStart;
        if (cursorPos !== cursorPosition || type === 'scroll') visibleHandler(false);
    };

    handleTab = e => {
        if (this.state.keywordList.length && this.props.visible) {
            this.insertKeyword(this.state.keywordList[this.state.selectedPosition]);
        }
    };

    autocompletionKeys = {
        UP: 'Up',
        DOWN: 'Down',
        TAB: 'Tab',
        ESC: 'Escape',
    };

    autocompletionHandlers = {
        UP: e => this.changeSelectedPosition(e, -1),
        DOWN: e => this.changeSelectedPosition(e, 1),
        TAB: this.handleTab,
        ESC: e => this.props.visibleHandler(false),
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
        const { children, visible, isACAvailable } = this.props;

        const autocompletionStyle = {
            transform: `translate(${blockPosition.left}px, ${blockPosition.top}px)`,
            display: visible ? 'flex' : 'none',
        };

        return isACAvailable ? (
            <div ref={ref => (this.acWrapperRef = ref)}>
                <div className="autocompletion" style={autocompletionStyle} ref={ref => (this.acRef = ref)}>
                    {this.getKeywordList(keywordList)}
                </div>
                <HotKeys keyMap={this.autocompletionKeys} handlers={this.autocompletionHandlers}>
                    {children(this.filterKeys, this.onPositionChange)}
                </HotKeys>
            </div>
        ) : (
            children()
        );
    }
}

export default Autocompletion;
