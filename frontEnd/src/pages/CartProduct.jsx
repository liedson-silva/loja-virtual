import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { DisplayPriceInBRL } from '../utils/DisplayPriceInBRL';
import { pricewithDiscount } from '../utils/pricewithDiscount';
import { IoTrashOutline } from "react-icons/io5";
import { toast } from 'react-hot-toast';

const CartProduct = () => {
    const [productData, setProductData] = useState([]);
    const navigate = useNavigate();

    const subtotal = productData.reduce((acc, curr) => {
        const price = pricewithDiscount(curr.productId?.price, curr.productId?.discount);
        return acc + (price * curr.quantity);
    }, 0);

    const fetchProductData = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getCartItem
            });
            if (response.data.success) {
                setProductData(response.data.data);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    }

    const updateQty = async (id, qty) => {
        if (qty < 1) return;
        try {
            const response = await Axios({
                ...SummaryApi.updateCartItem,
                data: { productId: id, quantity: qty }
            });
            if (response.data.success) {
                fetchProductData();
            }
        } catch (error) {
            AxiosToastError(error);
        }
    }

    const deleteItem = async (id) => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCartItem,
                data: { productId: id }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchProductData();
            }
        } catch (error) {
            AxiosToastError(error);
        }
    }

    const createOrder = async () => {
        try {
            const payload = {
                addressId: "648b1f4f4f1a2563b8e4d2c1",
                subTotalAmt: subtotal,
                totalAmt: subtotal,
            }
            const response = await Axios({
                ...SummaryApi.createOrder,
                data: payload
            });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchProductData();
                navigate('/dashboard/my-orders');
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    return (
        <div className='container mx-auto p-4 lg:p-8 min-h-[80vh]'>
            <h1 className='text-2xl font-bold mb-6'>Meu Carrinho</h1>

            {productData.length === 0 ? (
                <div className='bg-white p-12 rounded-xl shadow-md flex flex-col items-center border text-center'>
                    <p className='text-gray-500 text-xl mb-6'>Seu carrinho está vazio.</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    <div className='lg:col-span-2 flex flex-col gap-4'>
                        {productData.map((item) => (
                            <div key={item._id} className='bg-white p-4 rounded-xl shadow-sm border flex gap-4 items-center'>
                                <div className='w-24 h-24 bg-gray-50 rounded-lg p-2'>
                                    <img src={item.productId?.image?.[0]} className='w-full h-full object-scale-down' alt="" />
                                </div>

                                <div className='flex-1'>
                                    <h3 className='font-bold text-gray-800 line-clamp-1'>{item.productId?.name}</h3>
                                    <p className='text-green-600 font-bold text-lg'>
                                        {DisplayPriceInBRL(pricewithDiscount(item.productId?.price, item.productId?.discount))}
                                    </p>

                                    <div className='flex items-center gap-3 mt-3'>
                                        <div className='flex items-center border rounded-lg bg-gray-50'>
                                            <button onClick={() => updateQty(item._id, item.quantity - 1)} className='px-3 py-1 font-bold'>-</button>
                                            <span className='px-4 font-semibold border-x'>{item.quantity}</span>
                                            <button onClick={() => updateQty(item._id, item.quantity + 1)} className='px-3 py-1 font-bold'>+</button>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={() => deleteItem(item._id)} className='text-gray-400 hover:text-red-500 p-2'>
                                    <IoTrashOutline size={24} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className='bg-white p-6 rounded-xl shadow-lg border h-fit sticky top-24'>
                        <h2 className='text-xl font-bold mb-6 border-b pb-2'>Resumo do Pedido</h2>
                        <div className='space-y-3 mb-6'>
                            <div className='flex justify-between text-gray-600 '>
                                <p className='font-semibold'>Total</p>
                                <p className='font-semibold'>{DisplayPriceInBRL(subtotal)}</p>
                            </div>
                        </div>
                        <button onClick={createOrder} className='w-full bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 text-white py-4 rounded-xl font-bold hover:opacity-90 transition shadow-md'>
                            FINALIZAR COMPRA
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartProduct;