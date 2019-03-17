import * as types from '../../constants';

const initialState = {
    database: undefined,
    isDatabaseLoading: false,
};

const questions = (state = initialState, action) => {
    switch (action.type) {
        case types.DATABASE_LOADED:
            return {
                ...state,
                ...action.payload,
            };

        case types.DATABASE_LOADING:
            return {
                ...state,
                isDatabaseLoading: action.payload,
            };

        case types.CHANGE_TABLE_ACTIVITY:
            const database = Object.assign({}, state.database);
            database.tables[action.id].active = !database.tables[action.id].active;
            return {
                ...state,
                database,
            };

        default:
            return state;
    }
};

export default questions;
