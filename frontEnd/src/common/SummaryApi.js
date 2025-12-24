export const baseUrl = 'http://localhost:3000';

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
}

export default SummaryApi;