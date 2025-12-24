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
                            className='w-32 h-56 rounded shadow-md flex flex-col'
                            key={category._id}
                        >
                            <img
                                alt={category.name}
                                src={category.image}
                                className='w-full h-32 object-cover rounded-t-md'
                            />

                            <div className='flex justify-center mt-2'>
                                <span className='text-sm font-semibold text-center'>
                                    {category.name}
                                </span>
                            </div>

                            <div className='flex gap-2 mt-auto'>
                                <button
                                    onClick={() => {
                                        setOpenEdit(true);
                                        setEditData(category);
                                    }}
                                    className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded'
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => {
                                        setOpenConfirmBoxDelete(true);
                                        setDeleteCategory(category);
                                    }}
                                    className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded'
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