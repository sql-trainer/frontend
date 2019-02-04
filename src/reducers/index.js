import {
    combineReducers
} from 'redux';
import user from './userReducer';

const compareApp = combineReducers({
    user
});

export default compareApp;