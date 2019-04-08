import * as types from '../../constants';

const initialState = {
    notification: { message: '', level: '' },
};

const tabs = (state = initialState, { message, level, type }) => {
    switch (type) {
        case types.ADD_NOTIFICATION:
            return { ...state, notification: { message, level } };

        default:
            return state;
    }
};

export default tabs;
