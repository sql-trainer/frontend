import * as types from '../../constants';
import { addNotification } from './notificationActions';

const setDatabase = payload => ({ type: types.DATABASE_LOADED, payload });

const isLoading = payload => ({ type: types.DATABASE_LOADING, payload });

const changeTableActivity = id => ({ type: types.CHANGE_TABLE_ACTIVITY, id });

const loadDatabaseFromAPI = dbID => {
    return function(dispatch) {
        dispatch(isLoading(true));

        fetch(`http://localhost:8080/api/v1/db/open/${dbID}`)
            .then(res => res.json())
            .then(res =>
                dispatch(
                    res.error
                        ? addNotification({ message: res.message, level: 'error' })
                        : setDatabase({ database: { ...res }, isDatabaseLoading: false }),
                ),
            )
            .catch(err => dispatch(addNotification({ message: 'Ошибка при загрузке базы данных', level: 'error' })))
            .finally(() => dispatch(isLoading(false)));
    };
};

export { loadDatabaseFromAPI, changeTableActivity, isLoading };
