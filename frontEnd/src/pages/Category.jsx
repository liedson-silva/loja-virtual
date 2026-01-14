import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import EditCategory from '../components/EditCategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';

const Category = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({
        name: '',
        image: ''
    });
    const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState({
        _id: ''
    });

    const fetchCategory = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getCategory
            });
            const { data: responseData } = response;
            if (responseData.success) {
                setCategoryData(responseData.data);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        };
    };

     useEffect(() => {
        fetchCategory();
     }, []);

    const handleDeleteCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data: deleteCategory
            });
            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message);
                fetchCategory();
                setOpenConfirmBoxDelete(false);
            };
        } catch (error) {
            AxiosToastError(error);
        };
    };

    return (
        <section className='min-h-[80vh]'>
            <div className='p-4 bg-blue-50 rounded shadow-md flex items-center justify-between'>
                <h2 className='font-semibold'>Categoria</h2>
                <button
                    onClick={() => setOpenUploadCategory(!openUploadCategory)}
                    className='text-sm font-bold text-white min-w-20 border px-3 py-1 rounded-full bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 hover:opacity-90'>
                    Adicionar
                </button>
            </div>
            {!categoryData[0] && !loading && <NoData />}
            <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
                {categoryData.map((category, index) => {
                    return (
                        <div
                            className='max-w-40 max-h-56 rounded shadow-md flex flex-col p-2 gap-2 '
                            key={category._id}
                        >
                            <img
                                alt={category.name}
                                src={category.image}
                                className='w-full h-32 object-cover rounded-t-md'
                            />

                            <div className='flex justify-center mt-2'>
                                <span className='text-sm font-semibold text-center truncate'>
                                    {category.name}
                                </span>
                            </div>

                            <div className='flex gap-2 mt-auto justify-center'>
                                <button
                                    onClick={() => {
                                        setOpenEdit(true);
                                        setEditData(category);
                                    }}
                                    className='bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition-colors'
                                > 
                                    Editar
                                </button>
                                <button
                                    onClick={() => {
                                        setOpenConfirmBoxDelete(true);
                                        setDeleteCategory(category);
                                    }}
                                    className='bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors'
                                >
                                    Deletar
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {loading && <Loading />}
            {openUploadCategory && (
                <UploadCategoryModel
                    fetchData={fetchCategory}
                    close={() => setOpenUploadCategory(false)}
                />
            )}

            {openEdit && (
                <EditCategory
                    data={editData}
                    close={() => setOpenEdit(false)}
                    fetchData={fetchCategory}
                />
            )}

            {openConfirmBoxDelete && (
                <ConfirmBox
                    close={() => setOpenConfirmBoxDelete(false)}
                    cancel={() => setOpenConfirmBoxDelete(false)}
                    confirm={handleDeleteCategory}
                />
            )}
        </section>
    );
};

export default Category