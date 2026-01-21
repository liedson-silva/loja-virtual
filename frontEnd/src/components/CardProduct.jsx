import { useState } from 'react'
import { valideUrlConvert } from '../utils/valideUrlConvert';
import { Link, useNavigate } from 'react-router-dom';
import { pricewithDiscount } from '../utils/pricewithDiscount';
import { DisplayPriceInBRL } from '../utils/DisplayPriceInBRL';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';


const CardProduct = ({ data }) => {
    const url = `/product/${valideUrlConvert(data.name)}-${data._id}`;
    const navigate = useNavigate();

    const handleAddToCart = async (e) => {
        try {
            const response = await Axios({
                ...SummaryApi.addToCart,
                data: { productId: data._id, quantity: 1 }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/cart');
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className='border p-3 lg:p-4 grid gap-3 min-w-44 lg:min-w-52 rounded-lg bg-white hover:shadow-lg transition-shadow'>

            <Link to={url} className='grid cursor-pointer'>
                <div className='w-full h-32 lg:h-40 rounded overflow-hidden'>
                    <img src={data.image[0]} className='w-full h-32 object-scale-down' />
                </div>
                <div className='flex justify-between items-center mt-2 gap-2'>
                    <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
                        {data.name}
                    </div>
                    <div >
                        {Boolean(data.discount) && (
                            <p className='px-2 text-green-600 bg-green-100 w-fit text-xs rounded-full font-semibold'>{data.discount}% OFF</p>
                        )}
                    </div>
                </div>
            </Link>
            <div className='flex items-center justify-between'>
                <div className='px-2 lg:px-0 flex items-center justify-between gap-3 text-sm lg:text-base'>
                    <div className='flex items-center gap-1'>
                        <div className='font-semibold'>
                            {DisplayPriceInBRL(pricewithDiscount(data.price, data.discount))}
                        </div>
                    </div>
                </div>
                <div>
                    {data.stock == 0 ? (
                        <p className='text-red-500 text-sm text-center'>Fora de estoque</p>
                    ) : (
                        <button onClick={handleAddToCart} className='px-2 bg-green-500 text-white lg:px-2 lg:py-1 rounded hover:bg-green-600 transition'>
                            Adicionar
                        </button>
                    )}
                </div>
            </div>
        </section>
    )
}

export default CardProduct