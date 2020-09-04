import ajax from './ajax';

export const login = (username, password) => ajax('/login', {username, password}, 'POST');
export const addUser = (user) => ajax('/manage/user/add', user, 'POST');
export const getCategoryList = (parentId) => ajax('/manage/category/list', {parentId});
export const addCategory = (category) => ajax('/manage/category/add', category, 'POST');
export const updateCategory = (category) => ajax('/manage/category/update', category, 'POST');
export const getProducts = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize});
export const updateStatus = (productId, status) => ajax('/manage/product/updateStatus', {productId, status}, 'POST');
export const searchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax('/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName,
});
export const deleteImage = (name) => ajax('/manage/img/delete', {name}, 'POST');
export const addOrUpdateProduct = (product) => ajax('/manage/product/' + ( product._id ? 'update' : 'add'), product, 'POST');


