import * as types from '../../constants';

const addNotification = (message, level) => {
    return {
        type: types.ADD_NOTIFICATION,
        message,
        level,
    };
};

export { addNotification };
