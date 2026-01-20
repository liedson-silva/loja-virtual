import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import fetchUserDetails from '../utils/fetchUserDetails'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../store/userSlice'

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            };
        });
    }

    const valideValue = Object.values(data).every((el) => el);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios({
                ...SummaryApi.login,
                data: data
            });
            if (response.data.error) {
                toast.error(response.data.message);
            };

            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem("accessToken", response.data.data.accessToken);
                localStorage.setItem("refreshToken", response.data.data.refreshToken);

                const userDetails = await fetchUserDetails();
                dispatch(setUserDetails(userDetails.data));

                setData({
                    email: '',
                    password: ''
                });
                navigate("/");
            };
        } catch (error) {
            AxiosToastError(error);
        }
    }

    return (
        <section>
            <div className="w=full container mx-auto px-2">
                <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
                    <p className="font-semibold">Formulário de login</p>
                    <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
                        <div className='grid gap-1'>
                            <label htmlFor="email" className='font-semibold'>Email:</label>
                            <input
                                type="email"
                                id="email"
                                autoFocus
                                className='bg-blue-50 p-2 border rounded outline-none focus:border-secondary-100'
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                placeholder='Digite seu email'
                            />
                        </div>
                        <div className='grid gap-1'>
                            <label htmlFor="password" className='font-semibold'>Senha:</label>
                            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-100">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="flex-1 bg-transparent outline-none"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder='Digite sua senha'
                                />
                                <div
                                    onClick={() => setShowPassword((preve) => !preve)} className='cursor-pointer'>
                                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                </div>
                            </div>
                            <Link to='/forgot-password' className='block ml-auto hover:text-primary-100'>Esqueci minha senha</Link>
                        </div>
                        <button
                            disabled={!valideValue}
                            className={`${valideValue ? 'bg-secondary-100 hover:bg-primary-100' : 'bg-gray-500'} text-white py-2 rounded font-semibold my-3 tracking-wide`}
                        >
                            Entrar
                        </button>
                    </form>

                    <p>
                        Ainda não possui uma conta?{' '}
                        <Link to="/register" className="font-semibold text-secondary-100 hover:text-primary-100">
                            Cadastre-se
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Login