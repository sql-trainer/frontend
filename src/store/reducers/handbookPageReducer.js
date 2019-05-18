import * as types from '../../constants';

const initialState = {
    prevHandBookLink: "",
    nextHandBookLink: "",
    navigationLinks: []
};

const handbookPage = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_HANDBOOK_PAGE_NAV_LINKS:
            return { 
                ...state,
                ...action.payload
            }
        
        case types.CHANGE_HANDBOOK_PAGE_NAV:
            return {
                ...state,
                navigationLinks: action.payload
            }
            
        default:
            return state;
    }
};

export default handbookPage;
