import React, { PureComponent } from 'react';
import classNames from 'classnames';
import getCaretCoordinates from 'textarea-caret';
import { HotKeys } from 'react-hotkeys';

class Autocompletion extends PureComponent {
    state = {
        keywordList: [],
        position: [20, 10],
        searchString: '',
        selectedPosition: 0,
    };

    static defaultProps = {
        currTables: [],
        keywords: {},
        options: {},
        filterCondition: function(keyword, searchString, keywordsObj, options) {
            let keywordL = keyword;
            let searchStringL = searchString;

            if (!options.exactMatch) {
                keywordL = keyword.toLowerCase();
                searchStringL = searchString.toLowerCase();
            }

            return (
                (keywordL !== searchStringL ||
                    (keywordL === searchStringL && keywordsObj[keyword].type === 'function')) &&
                keywordL.startsWith(searchStringL)
            );
        },
    };

    constructor(props) {
        super(props);

        this.keywords = Object.keys(props.keywords);
    }

    getLeftBoundary = (cursorPos, textContent, boundary = /[^\w]/) => {
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

        const searchString = textContent.slice(leftBoundary, cursorPos);

        this.setState({
            keywordList:
                searchString === ''
                    ? []
                    : this.keywords.filter(keyword =>
                          this.props.filterCondition(keyword, searchString, this.props.keywords, this.props.options),
                      ),
            position: [caret.left, caret.top],
            searchString,
            selectedPosition: 0,
        });
    };

    insertKeyword = keyword => {
        const { value, keywords } = this.props;

        const inputEl = document.querySelector('.npm__react-simple-code-editor__textarea');
        inputEl.focus();

        const cursorPosition = inputEl.selectionStart;
        const leftBoundary = this.getLeftBoundary(cursorPosition, value);

        const isKeywordFunction = keywords[keyword].type === 'function';
        const textToInsert = keyword + (isKeywordFunction ? '()' : '') + ' ';

        inputEl.setSelectionRange(leftBoundary, cursorPosition);
        const isSuccess = document.execCommand('insertText', false, textToInsert);

        if (!isSuccess && typeof inputEl.setRangeText === 'function') {
            inputEl.setRangeText(textToInsert);
            inputEl.selectionStart = inputEl.selectionEnd = cursorPosition + textToInsert.length;
            const e = new Event('UIEvent');
            e.initEvent('input', true, false);
            inputEl.dispatchEvent(e);
        }

        if (isKeywordFunction) {
            const newCursorPosition = leftBoundary + textToInsert.length - 2;
            inputEl.setSelectionRange(newCursorPosition, newCursorPosition);
        }

        this.setState({ keywordList: [] });
    };

    changeselectedPosition = (e, direction) => {
        e.preventDefault();

        const { keywordList, selectedPosition } = this.state;

        if (keywordList.length) {
            const position =
                selectedPosition + direction < 0
                    ? keywordList.length - 1
                    : selectedPosition + direction >= keywordList.length
                    ? 0
                    : direction + selectedPosition;

            this.setState({ selectedPosition: position });
        }
    };

    autocompletionKeys = {
        UP: 'up',
        DOWN: 'down',
        TAB: 'tab',
    };

    autocompletionHandlers = {
        UP: e => this.changeselectedPosition(e, -1),
        DOWN: e => this.changeselectedPosition(e, 1),
        TAB: e => {
            if (this.state.keywordList.length) {
                e.preventDefault();
                e.stopPropagation();
                this.insertKeyword(this.state.keywordList[this.state.selectedPosition]);
            }
        },
    };

    render() {
        const { keywordList, position, selectedPosition, searchString } = this.state;
        const { children, value, keywords } = this.props;

        return (
            <>
                {keywordList && (
                    <>
                        <div
                            className="autocompletion"
                            style={{ transform: `translate(${position[0]}px, ${position[1] + 20}px)` }}
                        >
                            {keywordList.map((keyword, index) => (
                                <div
                                    key={index}
                                    onClick={e => this.insertKeyword(keyword)}
                                    className={classNames('keyword', {
                                        selected: selectedPosition === index,
                                        star: keywords[keyword].star,
                                    })}
                                >
                                    <div className={classNames('keyword-type', keywords[keyword].type)} />

                                    <div className="keyword-text">
                                        <b>{keyword.slice(0, searchString.length)}</b>
                                        {keyword.slice(searchString.length)}
                                        {keywords[keyword].type === 'function' ? '()' : ''}
                                    </div>

                                    {keywords[keyword].info && <div className="keyword-info" />}
                                </div>
                            ))}
                        </div>
                    </>
                )}
                <HotKeys keyMap={this.autocompletionKeys} handlers={this.autocompletionHandlers}>
                    {React.cloneElement(children, { onKeyUp: this.filterKeywords, value })}
                </HotKeys>
            </>
        );
    }
}

export default Autocompletion;
