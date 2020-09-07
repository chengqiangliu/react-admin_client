import ajax from './ajax';

export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST');
export const reqAddOrUpdateUser = (user) => ajax('/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST')
export const reqDeleteUser = (userId) => ajax('/manage/user/delete', {userId}, 'POST');
export const reqGetUsers = () => ajax('/manage/user/list');
export const reqAddRole = (roleName) => ajax('/manage/role/add', {roleName}, 'POST');
export const reqGetRoles = () => ajax('/manage/role/list');
export const reqUpdateRole = (role) => ajax('/manage/role/update', role, 'POST');
export const reqGetCategoryList = (parentId) => ajax('/manage/category/list', {parentId});
export const reqFindCategory = (categoryId) => ajax('/manage/category/info', {categoryId});
export const reqAddCategory = (category) => ajax('/manage/category/add', category, 'POST');
export const reqUpdateCategory = (category) => ajax('/manage/category/update', category, 'POST');
export const reqGetProducts = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize});
export const reqUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', {productId, status}, 'POST');
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax('/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName,
});
export const reqDeleteImage = (name) => ajax('/manage/img/delete', {name}, 'POST');
export const reqAddOrUpdateProduct = (product) => ajax('/manage/product/' + ( product._id ? 'update' : 'add'), product, 'POST');
