import {combineReducers} from 'redux';
import {RECEIVE_USER, RESET_USER, SHOW_ERROR_MSG} from './action-types';
import storageUtils from '../utils/storageUtils';

const initUser = storageUtils.getUser();

function user(state = initUser, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.data;
        case RESET_USER:
            return {};
        case SHOW_ERROR_MSG:
            const msg = action.data;
            return {...state, msg}
        default:
            return state;
    }
}

function others(state={}, action) {
    switch (action.type) {

        default:
            return state;
    }
}

export default combineReducers({user, others});