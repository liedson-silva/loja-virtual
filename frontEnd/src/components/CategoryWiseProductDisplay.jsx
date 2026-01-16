import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link } from 'react-router-dom';
import { valideUrlConvert } from '../utils/valideUrlConvert';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import CardProduct from './CardProduct';
import CardLoading from './CardLoading';

const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef();
    const subCategoryData = useSelector((state) => state.product.allSubCategory);
    const loadingCardNumber = new Array(6).fill(null);

    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: {
                    id: id
                }
            })

            const { data: responseData } = response;
            if (responseData.success) {
                setData(responseData.data);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryWiseProduct();
    }, []);

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200;
    };

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200;
    };

    const handleRedirectProductListpage = () => {
        const subCategory = subCategoryData.find(sub => {
            const filterData = sub.category.some(c => {
                return c._id == id;
            })

            return filterData ? true : null;
        });
        const url = `/${valideUrlConvert(name)}-${id}/${valideUrlConvert(subCategory?.name)}-${subCategory?._id}`;
        return url;
    };

    return (
        <div>
            <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
                <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
                <Link to={handleRedirectProductListpage()} className='text-sm text-blue-600 hover:underline'>Ver tudo</Link>
            </div>
            <div className='relative flex items-center'> 
                <div ref={containerRef} className='flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth'>
                    {loading &&
                        loadingCardNumber.map((_, index) => {
                            return (
                                <CardLoading key={index + 'categoryWiseProductDisplay123'} />
                            )
                        })
                    }

                    {data.map((p, index) => {
                        return (
                            <CardProduct
                                data={p}
                                key={p._id + 'categoryWiseProductDisplay' + index}
                            />
                        )
                    })}
                </div>

                <div className='w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between'>
                    <button onClick={handleScrollLeft} className="z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full"><FaAngleLeft /></button>
                    <button onClick={handleScrollRight} className="bg-white p-2 rounded-full shadow"><FaAngleRight /></button>
                </div>
            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay