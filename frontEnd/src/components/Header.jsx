import React, { use } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from 'react-icons/fa6'
import Search from './Search'
import { BsCart4 } from 'react-icons/bs';

const Header = () => {
    const navigate = useNavigate();

    const redirectToLoginPage = () => {
        navigate('/login');
    };

    return (
        <header className="h-25 lg:h-20 bg-gradient-to-r from-blue-300 via-blue-150 to-blue-50 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
            <div className="container flex mx-auto items-center h-full justify-between">
                <div className="h-full">
                    <Link
                        to="/"
                        className="h-full flex items-center justify-center text-3xl font-bold hidden lg:block p-4 text-transparent bg-gradient-to-r from-tertiary-100 secondary-100 to-primary-100 bg-clip-text"
                    >
                        Loja Virtual
                    </Link>
                    <Link
                        to="/"
                        className="h-full flex items-center justify-center text-2xl font-bold lg:hidden p-4 text-transparent bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 bg-clip-text"
                    >
                        Loja Virtual
                    </Link>
                </div>
                <div className='hidden lg:block'>
                    <Search />
                </div>
                <div>
                    <button className='text-neutral-600 lg:hidden mr-4'>
                        <FaRegCircleUser size={25} />
                    </button>
                    <div className='hidden lg:flex items-center gap-10'>
                        <button onClick={redirectToLoginPage} className='text-lg px-2'>
                            Entrar
                        </button>

                        <button className='flex items-center gap-2 bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 px-3 py-2 rounded text-white'>
                            <div>
                                <BsCart4 size={25} />
                            </div>
                            <div className='font-semibold text-sm'>
                                <p>Carrinho</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className='container mx-auto px-2 lg:hidden'>
                <Search />
            </div>
        </header>
    )
}

export default Header