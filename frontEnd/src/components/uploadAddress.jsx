import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const UploadAddress = ({ close, fetchData }) => {
    const [data, setData] = useState({
        address_line: '',
        city: '',
        state: '',
        pincode: '',
        country: 'Brasil',
        mobile: ''
    });
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.addAddress,
                data: data
            });

            if (response.data.success) {
                toast.success(response.data.message || "Endereço salvo!");
                close();
                fetchData();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        };
    };

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
            <div className='bg-blue-100 max-w-2xl w-full rounded-xl shadow-2xl overflow-hidden'>

                <div className='flex items-center justify-between p-4 border-b border-blue-200 bg-blue-100'>
                    <h1 className='font-bold'>Novo Endereço</h1>
                    <button onClick={close} className='w-fit block ml-auto'>
                        <IoClose size={25} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className='p-6 grid gap-4'>
                    <div className='grid gap-1'>
                        <label htmlFor="address_line" className="flex items-center gap-1 font-semibold text-gray-700 text-sm">
                            Endereço Completo:
                        </label>
                        <input
                            type="text"
                            id='address_line'
                            name='address_line'
                            placeholder='Rua, número, complemento e bairro'
                            value={data.address_line}
                            onChange={handleOnChange}
                            required
                            className='w-full px-3 py-2 bg-blue-50 outline-none border border-blue-200 rounded-lg focus:border-primary-100 transition-all'
                        />
                    </div>

                    {/* Linha: Cidade e Estado */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='grid gap-1'>
                            <label htmlFor="city" className="flex items-center gap-1 font-semibold text-gray-700 text-sm">
                                Cidade:
                            </label>
                            <input
                                type="text"
                                id='city'
                                name='city'
                                placeholder='Digite a cidade'
                                value={data.city}
                                onChange={handleOnChange}
                                required
                                className='w-full px-3 py-2 bg-blue-50 outline-none border border-blue-200 rounded-lg focus:border-primary-100'
                            />
                        </div>
                        <div className='grid gap-1'>
                            <label htmlFor="state" className="flex items-center gap-1 font-semibold text-gray-700 text-sm">
                                Estado:
                            </label>
                            <input
                                type="text"
                                id='state'
                                name='state'
                                placeholder='Ex: SP, RJ...'
                                value={data.state}
                                onChange={handleOnChange}
                                required
                                className='w-full px-3 py-2 bg-blue-50 outline-none border border-blue-200 rounded-lg focus:border-primary-100'
                            />
                        </div>
                    </div>

                    {/* Linha: CEP e Celular */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='grid gap-1'>
                            <label htmlFor="pincode" className="flex items-center gap-1 font-semibold text-gray-700 text-sm">
                                CEP:
                            </label>
                            <input
                                type="text"
                                id='pincode'
                                name='pincode'
                                placeholder='00000-000'
                                value={data.pincode}
                                onChange={handleOnChange}
                                required
                                className='w-full px-3 py-2 bg-blue-50 outline-none border border-blue-200 rounded-lg focus:border-primary-100'
                            />
                        </div>
                        <div className='grid gap-1'>
                            <label htmlFor="mobile" className="flex items-center gap-1 font-semibold text-gray-700 text-sm">
                                Celular:
                            </label>
                            <input
                                type="text"
                                id='mobile'
                                name='mobile'
                                placeholder='(00) 00000-0000'
                                value={data.mobile}
                                onChange={handleOnChange}
                                required
                                className='w-full px-3 py-2 bg-blue-50 outline-none border border-blue-200 rounded-lg focus:border-primary-100'
                            />
                        </div>
                    </div>

                    {/* Botão de Ação */}
                    <div className='flex gap-3 mt-4'>

                        <button
                            type='submit'
                            disabled={loading}
                            className={`flex-[2] py-2 rounded-full font-bold text-white transition-all shadow-md active:scale-95
                                ${!loading
                                    ? 'bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 hover:opacity-95'
                                    : 'bg-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {loading ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default UploadAddress;