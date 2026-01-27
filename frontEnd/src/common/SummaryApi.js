export const baseUrl = 'https://loja-virtual-phi-lyart.vercel.app';

const SummaryApi = {
    register: {
        url: '/user/register',
        method: 'post',
    },
    login: {
        url: '/user/login',
        method: 'post',
    },
    forgot_password: {
        url: '/user/forgot-password',
        method: 'put',
    },
    verify_otp: {
        url: '/user/verify-forgot-password-otp',
        method: 'put',
    },
    resetPassword: {
        url: '/user/reset-password',
        method: 'put',
    },
    refreshToken: {
        url: '/user/refresh-token',
        method: 'post',
    },
    userDetails: {
        url: '/user/user-details',
        method: 'get',
    },
    logout: {
        url: '/user/logout',
        method: 'get',
    },
    uploadAvatar: {
        url: '/user/upload-avatar',
        method: 'put',
    },
    updateUserDetails: {
        url: '/user/update-user',
        method: 'put',
    },
    addCategory: {
        url: '/category/add-category',
        method: 'post',
    },
    getCategory: {
        url: '/category/get',
        method: 'get',
    },
    updateCategory: {
        url: '/category/update',
        method: 'put',
    },
    deleteCategory: {
        url: '/category/delete',
        method: 'delete',
    },
    uploadImage: {
        url: '/file/upload',
        method: 'post',
    },
    createSubCategory: {
        url: '/subcategory/create',
        method: 'post',
    },
    getSubCategory: {
        url: '/subcategory/get',
        method: 'get',
    },
    updateSubCategory: {
        url: '/subcategory/update',
        method: 'put',
    },
    deleteSubCategory: {
        url: '/subcategory/delete',
        method: 'delete',
    },
    createProduct: {
        url: '/product/create',
        method: 'post',
    },
    getProduct: {                
        url: '/product/get',
        method: 'post',
    },
    updateProduct: {
        url: '/product/update',
        method: 'put',
    },
    deleteProduct: {
        url: '/product/delete',
        method: 'delete',
    },
    getProductByCategory: {
        url: '/product/get-product-by-category',
        method: 'post',
    },
    getProductByCategoryAndSubCategory: {
        url: '/product/get-product-by-category-and-subcategory',
        method: 'post',
    },
    getProductDetails: {
        url: '/product/get-product-details',
        method: 'post',
    },
    addToCart: {
        url: '/cartproduct/add-item-to-cart',
        method: 'post',
    },
    getCartItem: {
        url: '/cartproduct/get-items-in-cart',
        method: 'get',
    },
    updateCartItem: {
        url: '/cartproduct/update-cart-item',
        method: 'put',
    },
    deleteCartItem: {
        url: '/cartproduct/delete-cart-item',
        method: 'delete',
    },
}

export default SummaryApi;