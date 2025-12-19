import React, { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false);

    useEffect(() => {
        const isSearch = location.pathname === '/search';
        setIsSearchPage(isSearch);
    }, [location])


    const redirectToSearchPage = () => {
        navigate('/search');
    }
    return (
        <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-secondary-100">
            <button className="flex justify-center items-center h-full p-3 group-focus-within:text-secondary-100">
                <IoSearch size={22} />
            </button>

            <div className="flex-1 h-full">
                {!isSearchPage ? (
                    <div onClick={redirectToSearchPage} className="h-full w-full flex items-center">
                        <TypeAnimation
                            sequence={[
                                'Pesquisar "leite"',
                                1000,
                                'Pesquisar "arroz"',
                                1000,
                                'Pesquisar "feijão"',
                                1000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </div>
                ) : (
                    <div className='w-full h-full'>
                        <input type="text" placeholder='Pesquise por produtos e mais.' autoFocus className='bg-transparent w-full h-full outline-none' />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Search