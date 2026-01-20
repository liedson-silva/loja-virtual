import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { FaAsterisk } from 'react-icons/fa';

const EditCategory = ({ close, fetchData, data: categoryData }) => {
    const [data, setData] = useState({
        _id: categoryData._id,
        name: categoryData.name,
        image: categoryData.image
    });
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.updateCategory,
                data: data
            });
            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message);
                close();
                fetchData();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadCategoryImage = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        setLoading(true);
        const response = await uploadImage(file);
        const { data: ImageResponse } = response;
        setLoading(false);

        setData((preve) => {
            return {
                ...preve,
                image: ImageResponse.data.url
            };
        });
    }

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
            <div className='bg-blue-100 max-w-4xl w-full p-4 rounded'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-bold'>Atualizar categoria</h1>
                    <button onClick={close} className='w-fit block ml-auto'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className='my-3 grid gap-2'>
                    <div className='grid gap-1'>
                        <label htmlFor="categoryName" className="flex gap-1 font-semibold">Nome: <FaAsterisk className='size-2 text-red-500' /></label>
                        <input
                            type="text"
                            id="categoryName"
                            placeholder='Digite o nome da categoria'
                            value={data.name}
                            name="name"
                            onChange={handleOnChange}
                            className='py-2 bg-blue-50 outline-none border rounded hover:border-primary-100'
                        />
                    </div>
                    <div className='grid gap-1'>
                       <p className="flex gap-1 font-semibold">Foto: <FaAsterisk className='size-2 text-red-500' /></p>
                        <div className='flex gap-4 flex-col lg:flex-row items-center'>
                            <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded'>
                                {data.image ? (
                                    <img
                                        alt='category'
                                        src={data.image}
                                        className='w-full h-full object-scale-down'
                                    />
                                ) : (
                                    <p className='text-sm text-neutral-500'>Sem Foto</p>
                                )}
                            </div>
                            <label htmlFor="uploadCategoryImage">
                                <div
                                    className={`
                                        ${data.name
                                            ? 'text-sm cursor-pointer font-bold text-white min-w-20 border px-3 py-1 rounded-full bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 hover:opacity-90'
                                            : 'text-sm bg-gray-500 text-white px-3 py-1 rounded-full font-bold'
                                        }
                                    `}>
                                    Carregar Foto
                                </div>
                                <input
                                    disabled={!data.name}
                                    onChange={handleUploadCategoryImage}
                                    type="file"
                                    id='uploadCategoryImage'
                                    className='hidden'
                                />
                            </label>
                        </div>
                    </div>
                    <button
                        className={`
                            ${data.name && data.image
                                ? 'text-sm cursor-pointer font-bold text-white min-w-20 border px-3 py-1 rounded-full bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 hover:opacity-90'
                                : 'text-sm bg-gray-500 text-white px-3 py-1 rounded-full font-bold'
                            }
                        `}>
                        Salvar
                    </button>
                </form>
            </div>
        </section>
    )
}

export default EditCategory
