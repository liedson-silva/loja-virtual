export const baseUrl = 'http://localhost:3000';

const SummaryApi = {
    register: {
        url: '/register',
        method: 'POST',
    },
    login:{
        url: '/login',
        method: 'POST',
    },
    forgot_password:{
        url: '/forgot-password',
        method: 'PUT',
    },
    verify_otp:{
        url: '/verify-forgot-password-otp',
        method: 'PUT',
    }
}

export default SummaryApi;