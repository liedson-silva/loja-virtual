export const baseUrl = 'https://loja-virtual-phi-lyart.vercel.app';

const SummaryApi = {
    register: {
        url: '/register',
        method: 'post',
    },
    login:{
        url: '/login',
        method: 'post',
    },
    forgot_password:{
        url: '/forgot-password',
        method: 'put',
    },
    verify_otp:{
        url: '/verify-forgot-password-otp',
        method: 'put',
    },
    resetPassword:{
        url: '/reset-password',
        method: 'put',
    },
    refreshToken:{
        url: '/refresh-token',
        method: 'post',
    },
    userDetails:{
        url: '/user-details',
        method: 'get',
    },
    logout:{
        url: '/logout',
        method: 'get',
    },
    uploadAvatar:{
        url: '/upload-avatar',
        method: 'put',
    },
    updateUserDetails:{
        url: '/update-user',
        method: 'put',
    },
    addCategory:{
        url: '/api/category/add-category',
        method: 'post',
    },
    getCategory:{
        url: '/api/category/get',
        method: 'get',
    },
    updateCategory:{
        url: '/api/category/update',
        method: 'put',
    },
    deleteCategory:{
        url: '/api/category/delete',
        method: 'delete',
    },
    uploadImage:{
        url: '/api/file/upload',
        method: 'post',
    },
}

export default SummaryApi;