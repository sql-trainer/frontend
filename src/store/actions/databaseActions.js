import * as types from '../../constants';

const setDatabase = payload => {
    return {
        type: types.DATABASE_LOADED,
        payload,
    };
};

const isLoading = payload => {
    return {
        type: types.DATABASE_LOADING,
        payload,
    };
};

const changeTableActivity = id => {
    return {
        type: types.CHANGE_TABLE_ACTIVITY,
        id,
    };
};

const loadDatabaseFromAPI = dbID => {
    return function(dispatch) {
        dispatch(isLoading(true));

        // API stub
        fetch('https://api.myjson.com/bins/f1jvq')
            .then(res => res.json())
            .then(res => {
                if (res.status === 404) {
                    dispatch(isLoading(false));
                    console.log(res);
                } else {
                    dispatch(setDatabase(res));
                }
            })
            .catch(err => {
                dispatch(isLoading(false));
                console.log(err);
            });
        // TODO: Доделать обработку ошибок
    };
};

export { loadDatabaseFromAPI, changeTableActivity, isLoading };
