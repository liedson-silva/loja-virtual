import { useEffect, useRef, useState } from 'react'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { useParams } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { DisplayPriceInBRL } from '../utils/DisplayPriceInBRL';
import { pricewithDiscount } from '../utils/pricewithDiscount';
import AddToCardButton from '../components/AddToCardButton';
import image1 from '../assets/delivery.png';
import image2 from '../assets/best-price.png';
import image3 from '../assets/assortment.png';

const ProductDisplayPage = () => {
    const params = useParams();
    let productId = params?.product?.split('-')?.slice(-1)[0];
    const [data, setData] = useState({
        name: '',
        image: []
    });
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(0);
    const imageContainer = useRef();

    const fetchProductDetails = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getProductDetails,
                data: {
                    productId: productId
                }
            })

            const { data: responseData } = response;
            if (responseData.success) {
                setData(responseData.data[0]);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, [params]);

    const handleScrollRight = () => {
        imageContainer.current.scrollLeft += 100;
    };

    const handleScrollLeft = () => {
        imageContainer.current.scrollLeft -= 100;
    };

    return (
        <section className='container mx-auto p-4 grid lg:grid-cols-2'>
            <div>
                <div className='bg-white lg:min-h[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full'>
                    <img
                        src={data.image[image]}
                        className='w-full h-full object-scale-down'
                    />
                </div>
                <div className='flex items-center justify-center gap-3 my-2'>
                    {data.image.map((img, index) => {
                        return (
                            <div key={img + index + 'point'} className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image ? 'border-2 border-green-500' : ''}`} onClick={() => setImage(index)}></div>
                        )
                    })}
                </div>
                <div className='grid relative'>
                    <div ref={imageContainer} className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none'>
                        {data.image.map((img, index) => {
                            return (
                                <div className='w-20 h-20 min-h-20 min-w-20 scr cursor-pointer shadow-md' key={img + index}>
                                    <img
                                        src={img}
                                        alt='min-product'
                                        onClick={() => setImage(index)}
                                        className='w-full h-full object-scale-down'
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className='w-full ml-3 h-full hidden lg:flex justify-between absolute items-center'>
                        <button onClick={handleScrollLeft} className='z-10 bg-white relative p-1 rounded-full shadow-lg'><FaAngleLeft /></button>
                        <button onClick={handleScrollRight} className='z-10 bg-white relative p-1 rounded-full shadow-lg'><FaAngleRight /></button>
                    </div>
                </div>

                <div className='my-4 hidden lg:grid gap-3'>
                    {data?.more_details && Object.keys(data?.more_details).map((element, index) => {
                        return (
                            <div>
                                <p className='font-semibold'>{element}</p>
                                <p className='text-base'>{data?.more_details[element]}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div>
                <div className='p-4 lg:pl-7 text-base lg:text-lg'>
                    <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>
                    <p>Quantidade: {data.stock}</p>
                    <hr />
                    <div>
                        <p>Preço</p>
                        <div className='flex items-center gap-2 lg:gap-4'>
                            <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
                                <p className='font-semibold text-lg lg:text-xl'>{DisplayPriceInBRL(pricewithDiscount(data.price, data.discount))}</p>
                            </div>
                            {data.discount && (
                                <p className='line-through'>{DisplayPriceInBRL(data.price)}</p>
                            )}
                            {data.discount && (
                                <p className='font-bold text-green-600 lg:text-2xl'>{data.discount}% OFF</p>
                            )}
                        </div>
                    </div>
                    {data.stock === 0 ? (
                        <p className='text-red-500 text-lg my-2'>Fora de estoque</p>
                    ) : (
                        <div className='my-4'>
                            <AddToCardButton data={data} />
                        </div>
                    )}

                    <h2 className='font-semibold'>Por que comprar em nossa loja?</h2>
                    <div>
                        <div className='flex items-center gap-4 my-4'>
                            <img
                                src={image1}
                                alt='superfast delivery'
                                className='w-20 h-20'
                            />
                            <div className='text-sm'>
                                <div className='font-semibold'>Entrega com responsabilidade</div>
                                <p>Garantimos que seu pedido será entregue com cuidado e no prazo.</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 my-4'>
                            <img
                                src={image2}
                                alt='best prices offers'
                                className='w-20 h-20'
                            />
                            <div className='text-sm'>
                                <div className='font-semibold'>Melhores ofertas e preços</div>
                                <p>Aproveite descontos exclusivos e preços imbatíveis em nossos produtos.</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 my-4'>
                            <img
                                src={image3}
                                alt='Wide Assortment'
                                className='w-20 h-20'
                            />
                            <div className='text-sm'>
                                <div className='font-semibold'>Variedade ampla</div>
                                <p>Explore uma ampla variedade de produtos para atender a todas as suas necessidades.</p>
                            </div>
                        </div>
                    </div>

                    <div className='my-4 lg:grid gap-3'>
                        <div>
                            <p className='font-semibold'>Descrição</p>
                            <p className='text-base'>{data.description}</p>
                        </div>
                        <div>
                            <p className='font-semibold'>Unidades</p>
                            <p className='text-base'>{data.unit}</p>
                        </div>
                        {data?.more_details && Object.keys(data?.more_details).map((element, index) => {
                            return (
                                <div>
                                    <p className='font-semibold'>{element}</p>
                                    <p className='text-base'>{data?.more_details[element]}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDisplayPage