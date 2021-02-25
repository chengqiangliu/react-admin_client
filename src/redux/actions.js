/**
 * 包含n个生成action函数的模块
 * 生成的action有两种：同步action， 异步action
 * 同步action： 是一个对象，{type: 类型, data: 数据值}
 * 异步action： 是一个函数，dispatch => {}
 */
import {RECEIVE_USER, RESET_USER, SHOW_ERROR_MSG} from './action-types';
import storageUtils from '../utils/storageUtils';
import {reqLogin} from '../api';

export const receiveUser = (user) => ({type: RECEIVE_USER, data: user});

export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, data: errorMsg});

export const logout = () => {
    storageUtils.removeUser();
    return {type: RESET_USER, data: {}};
};

export const login = (username, password) => {
    return async dispatch => {
        const result = await reqLogin(username, password);
        if (result && result.status === 0) {
            const user = result.data;
            storageUtils.saveUser(user);
            dispatch(receiveUser(user));
        } else {
            const msg = result.msg;
            dispatch(showErrorMsg(msg));
        }
    }
}