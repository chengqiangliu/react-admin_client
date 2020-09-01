import ajax from './ajax';

export const login = (username, password) => ajax('/login', {username, password}, 'POST');
export const addUser = (user) => ajax('/manage/user/add', user, 'POST');
export const getCategoryList = (parentId) => ajax('/manage/category/list', {parentId}, 'GET');
export const addCategory = (category) => ajax('/manage/category/add', category, 'POST');
