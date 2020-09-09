import {combineReducers} from 'redux';
import action from './action-types';
import storageUtils from "../utils/storageUtils"

const initHeaderTitle = '首页';
function headerTitle(state=initHeaderTitle, action) {
    switch (action.type) {
        default:
            return state;
    }
}

const initUser = storageUtils.getUser()
function user(state=initUser, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default combineReducers({
    headerTitle, user
});