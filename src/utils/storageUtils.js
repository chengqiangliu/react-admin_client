/**
 * A module to store the data in the local
 */
import store from 'store';

const USER_KEY = 'user_key';
export default {

    /**
     * Store current user
     * @param user
     */
    saveUser(user) {
        store.set(USER_KEY, user);
    },

    /**
     * Get current user
     * @returns {*|{}}
     */
    getUser() {
        return store.get(USER_KEY) || {};
    },

    /**
     * Remove current user
     * @returns {*|string}
     */
    removeUser() {
        store.remove(USER_KEY);
    },
}