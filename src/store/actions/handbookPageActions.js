import * as types from '../../constants';

const changeHandbookPageLinks = (prevHandBookLink, nextHandBookLink) => {
    return {
        type: types.CHANGE_HANDBOOK_PAGE_NAV_LINKS,
        payload: {
            prevHandBookLink,
            nextHandBookLink
        }
    };
};

const changeHandbookPageNav = (navList) => {
    return {
        type: types.CHANGE_HANDBOOK_PAGE_NAV,
        payload: navList
    }
}

export { 
    changeHandbookPageLinks,
    changeHandbookPageNav
};
