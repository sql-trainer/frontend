import * as types from '../../constants';

const getTestMeta = (dbID, addNotification) => {
    return function(dispatch) {
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

export { getTestMeta };
