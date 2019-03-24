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

const loadDatabaseFromAPI = (dbID, addNotification) => {
    return function(dispatch) {
        dispatch(isLoading(true));

        fetch(`http://localhost:8080/api/v1/db/open/${dbID}`)
            .then(res => res.json())
            .then(res =>
                res.error
                    ? addNotification({ message: res.message, level: 'error' })
                    : dispatch(setDatabase({ database: { ...res }, isDatabaseLoading: false })),
            )
            .catch(err => addNotification({ message: 'Ошибка при загрузке базы данных', level: 'error' }))
            .finally(() => dispatch(isLoading(false)));
    };
};

export { loadDatabaseFromAPI, changeTableActivity, isLoading };
