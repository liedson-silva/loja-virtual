import { useState } from 'react'
import { valideUrlConvert } from '../utils/valideUrlConvert';
import { Link } from 'react-router-dom';
import { pricewithDiscount } from '../utils/pricewithDiscount';
import AddToCardButton from './AddToCardButton';
import { DisplayPriceInBRL } from '../utils/DisplayPriceInBRL';


const CardProduct = ({ data }) => {
    const url = `/product/${valideUrlConvert(data.name)}-${data._id}`;
    const [loading, setLoading] = useState(false);

    return (
        <Link to={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white'>
            <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
                <img src={data.image[0]} className='w-full object-scale-down h-full lg:scale-125' />
            </div>
            <div className='flex items-center gap-1'>
                <div className='rounded text-xs w-fit p-[1px] px-2 text-green-600 bg-green-50'>
                    10
                </div>
                <div>
                    {Boolean(data.discount) && (
                        <p className='text-green-600 bg-green-100 px-2 w-fit text-xs rounded-full'>{data.discount}%</p>
                    )}
                </div>
            </div>

            <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
                {data.name}
            </div>
            <div className='w-fit px-2 gap-1 lg:px-0 text-sm lg:text-base'>
                {data.unit}
            </div>

            <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
                <div className='flex items-center gap-1'>
                    <div className='font-semibold'>
                        {DisplayPriceInBRL(pricewithDiscount(data.price, data.discount))}
                    </div>
                </div>

                <div>
                    {data.stock == 0 ? (
                        <p className='text-red-500 text-sm text-center'>Fora de estoque</p>
                    ) : (
                        <AddToCardButton data={data} />
                    )}
                </div>
            </div>
        </Link>
    )
}

export default CardProduct