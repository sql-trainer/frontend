import * as types from '../../constants';

const changeVisibility = visible => ({ type: types.CHANGE_VISIBILITY, visible });

const changeKeywords = keywords => ({ type: types.REPLACE_KEYWORDS, keywords });

const replaceKeywords = (newKeywords, replaceType) => {
    return function(dispatch, getState) {
        let keywords = getState().ac.keywords;

        keywords = keywords.filter(k => k.type !== replaceType);
        keywords.push(...newKeywords);

        dispatch(changeKeywords(keywords));
    };
};

const createDatabaseKeywords = () => {
    return function(dispatch, getState) {
        const tables = getState().database.database.tables;

        dispatch(
            replaceKeywords(
                tables.map(t => ({
                    label: t.title,
                    type: 'table',
                    insertSpace: false,
                    children: { '.': [...t.props.map(p => ({ label: p.name, type: 'prop', insertSpace: false }))] },
                })),
                'table',
            ),
        );

        let props = [];
        tables.forEach(t => props.push(...t.props.map(p => p.name)));
        props = Array.from(new Set(props));
        dispatch(replaceKeywords(props.map(p => ({ label: p, type: 'prop', insertSpace: false })), 'prop'));
    };
};

export { replaceKeywords, createDatabaseKeywords, changeVisibility };
