import * as types from '../../constants';

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_USER:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
