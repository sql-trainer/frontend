import * as types from '../constants';

const changeUser = (user) => {
    return {
        types: types.CHANGE_USER,
        payload: user
    }
}

export {
    changeUser
}