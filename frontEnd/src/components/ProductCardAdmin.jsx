import React, { useState } from 'react'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import ConfirmBox from './ConfirmBox';
import EditProductAdmin  from '../components/EditProductAdmin';

const ProductCardAdmin = ({ data, fetchProductData }) => {
    const [editOpen, setEditOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleDeleteCancel = () => {
        setOpenDelete(false);
    }

    const handleDelete = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteProduct,
                data: {
                    _id: data._id
                }
            });

            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message);
                if (fetchProductData) {
                    fetchProductData();
                }
                setOpenDelete(false);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    }

    return (
        <div className='max-w-40 max-h-56 rounded shadow-md flex flex-col p-2 gap-2'>
            <div>
                <img
                    src={data?.image[0]}
                    alt={data?.name}
                    className='w-full h-32 object-scale-down'
                />
            </div>
            <p className='text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
            <p className='text-slate-400'>{data?.unit}</p>
            <div className='flex gap-2 mt-auto justify-center'>
                <button onClick={() => setEditOpen(true)} className='bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition-colors'>Editar</button>
                <button onClick={() => setOpenDelete(true)} className='bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors'>Deletar</button>
            </div>

            {editOpen && (
                <EditProductAdmin
                    data={data}
                    close={() => setEditOpen(false)}
                    fetchProductData={fetchProductData}
                />
            )}

            {openDelete && (
                <ConfirmBox
                    close={() => setOpenDelete(false)}
                    cancel={() => setOpenDelete(false)}
                    confirm={handleDelete}
                />
            )}
        </div>
    )
}

export default ProductCardAdmin