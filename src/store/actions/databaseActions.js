import * as types from '../../constants';
import { addNotification } from './notificationActions';
import { changeLoaderVisibility } from './testActions';
import { createDatabaseKeywords } from './autocompleteActions';

const setDatabase = payload => ({ type: types.DATABASE_LOADED, payload });

const isLoading = payload => ({ type: types.DATABASE_LOADING, payload });

const loadDatabaseFromAPI = dbID => {
    return function(dispatch) {
        dispatch(isLoading(true));

        fetch(`/api/v1/db/open/${dbID}/`)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    dispatch(addNotification({ message: res.message, level: 'error' }));
                } else {
                    dispatch(setDatabase({ database: { ...res }, isDatabaseLoading: false }));
                    dispatch(createDatabaseKeywords());
                }
            })
            .catch(err => dispatch(addNotification({ message: 'Ошибка при загрузке базы данных', level: 'error' })))
            .finally(() => {
                dispatch(isLoading(false));
                dispatch(changeLoaderVisibility(false));
            });
    };
};

export { loadDatabaseFromAPI, isLoading };
