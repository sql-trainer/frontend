import * as types from '../../constants';

const initialState = {
    keywords: [
        {
            label: 'select',
            snippets: [
                { label: 'select * from …', type: 'snippet' },
                { label: 'select * from … where …', type: 'snippet' },
            ],
        },
        { label: 'timediff', type: 'function' },
        { label: 'count', type: 'function', snippets: [{ label: 'count(*)', type: 'snippet' }] },
        { label: 'from' },
        { label: 'group', snippets: [{ label: 'group by …' }] },
        { label: 'order', snippets: [{ label: 'order by …' }] },
        { label: 'asc' },
        { label: 'desc' },
        { label: 'by' },
        { label: 'inner', snippets: [{ label: 'inner join', type: 'snippet' }] },
        { label: 'full', snippets: [{ label: 'full join', type: 'snippet' }] },
        { label: 'left', snippets: [{ label: 'left join', type: 'snippet' }] },
        { label: 'right', snippets: [{ label: 'right join', type: 'snippet' }] },
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
        { label: 'year', type: 'function', props: ['DATE'], highlightProps: true },
        { label: 'create' },
    ],
    options: {
        insertSpaceAfterKeyword: true,
        insertBracketsAfterFunction: true,
    },
    visible: true,
};

const ac = (state = initialState, action) => {
    switch (action.type) {
        case types.REPLACE_KEYWORDS:
            return {
                ...state,
                keywords: action.keywords,
            };

        case types.CHANGE_VISIBILITY:
            return {
                ...state,
                visible: action.visible,
            };

        default:
            return state;
    }
};

export default ac;
