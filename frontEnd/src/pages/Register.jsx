import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'

const Register = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            };
        });
    };

    const valideValue = Object.values(data).every((el) => el);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            toast.error("As senhas não coincidem");
            return;
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data: data
            });

            if (response.data.error) {
                toast.error(response.data.message);
            };

            if (response.data.success) {
                toast.success(response.data.message);
                setData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                navigate("/login");
            };
        } catch (error) {
            AxiosToastError(error);
        }
    };
    return (
        <section>
            <div className="w=full container mx-auto px-2">
                <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
                    <p className="font-semibold">Formulário de Cadastro</p>
                    <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
                        <div className='grid gap-1'>
                            <label htmlFor="name" className='font-semibold'>Nome:</label>
                            <input
                                type="text"
                                id="name"
                                autoFocus
                                className='bg-blue-50 p-2 border rounded outline-none focus:border-secondary-100'
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                placeholder='Digite seu nome'
                            />
                        </div>
                        <div className='grid gap-1'>
                            <label htmlFor="email" className='font-semibold'>Email:</label>
                            <input
                                type="email"
                                id="email"
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
                                <div onClick={() => setShowPassword((preve) => !preve)} className='cursor-pointer'>
                                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                </div>
                            </div>
                        </div>
                        <div className='grid gap-1'>
                            <label htmlFor="confirmPassword" className='font-semibold'>Confirme a senha:</label>
                            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-100">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    className="flex-1 bg-transparent outline-none"
                                    name="confirmPassword"
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    placeholder='Confirme sua senha'
                                />
                                <div
                                    onClick={() => setShowConfirmPassword((preve) => !preve)}
                                    className='cursor-pointer'
                                >
                                    {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                </div>
                            </div>
                        </div>
                        <button
                            disabled={!valideValue}
                            className={`${!valideValue ? 'bg-gray-500 opacity-50 cursor-not-allowed' : 'bg-secondary-100 hover:bg-primary-100'} text-white py-2 rounded font-semibold my-3`}>
                            Cadastrar
                        </button>
                    </form>

                    <p>
                        Já possui uma conta?{' '}
                        <Link to="/login" className="font-semibold text-secondary-100 hover:text-primary-100">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Register