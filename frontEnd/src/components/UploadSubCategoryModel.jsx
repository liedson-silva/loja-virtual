import { useState } from "react"
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import { useSelector } from 'react-redux'
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { FaAsterisk } from "react-icons/fa";

const UploadSubCategoryModel = ({ fetchData, closeModal }) => {
    const [subCategoryData, setSubCategoryData] = useState({
        name: '',
        image: '',
        category: [],
    });

    const allCategory = useSelector((state) => state.product.allCategory);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubCategoryData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleUploadSubCategoryImage = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        };

        const response = await uploadImage(file);
        const { data: ImageResponse } = response;

        setSubCategoryData((prev) => {
            return {
                ...prev,
                image: ImageResponse.data.url,
            };
        });
    };

    const handleRemoveCategorySelected = (categoryId) => {
        const index = subCategoryData.category.findIndex(
            (el) => el._id === categoryId
        );
        subCategoryData.category.splice(index, 1);
        setSubCategoryData((prev) => {
            return {
                ...prev
            };
        });
    };

    const handleSubmitSubCategory = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios({
                ...SummaryApi.createSubCategory,
                data: subCategoryData
            });

            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message);
                if (fetchData) {
                    fetchData();
                }
                handleClose();
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const handleClose = () => {
        setSubCategoryData({
            name: '',
            image: '',
            category: []
        });
        if (closeModal) {
            closeModal();
        }
    };

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
            <div className='bg-gradient-to-r from-blue-300 via-blue-150 to-blue-50 max-w-4xl w-full p-4 rounded'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-bold'>Nova Sub Categoria</h1>
                    <button onClick={handleClose} className='w-fit block ml-auto'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form onSubmit={handleSubmitSubCategory} className='my-3 grid gap-2'>
                    <div className='grid gap-1'>
                        <label htmlFor="name" className="flex gap-1 font-semibold">Nome: <FaAsterisk className='size-2 text-red-500' /></label>
                        <input
                            type="text"
                            id='name'
                            placeholder='Digite o nome da sub categoria'
                            value={subCategoryData.name}
                            name='name'
                            onChange={handleChange}
                            className='py-2 bg-blue-50 outline-none border rounded hover:border-primary-100'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <p className="flex gap-1 font-semibold">Foto: <FaAsterisk className='size-2 text-red-500' /></p>
                        <div className='flex gap-4 flex-col lg:flex-row items-center'>
                            <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded'>
                                {subCategoryData.image ? (
                                    <img
                                        alt='Subcategory'
                                        src={subCategoryData.image}
                                        className='w-full h-full object-scale-down'
                                    />
                                ) : (
                                    <p className='text-sm text-neutral-500'>Sem Foto</p>
                                )}
                            </div>
                            <label htmlFor="uploadSubCategoryImage">
                                <div
                                    className={`
                                            ${subCategoryData.name
                                            ? 'text-sm cursor-pointer font-bold text-white min-w-20 border px-3 py-1 rounded-full bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 hover:opacity-90'
                                            : 'text-sm bg-gray-500 text-white px-3 py-1 rounded-full font-bold'
                                        }
                                            `}>
                                    Carregar Foto
                                </div>
                                <input
                                    disabled={!subCategoryData.name}
                                    onChange={handleUploadSubCategoryImage}
                                    type="file"
                                    id='uploadSubCategoryImage'
                                    className='hidden'
                                />
                            </label>
                        </div>
                    </div>

                    <div className="grid gap-1">
                        <label>Selecione a Categoria</label>
                        <div className="border focus-within:border-primary-100 rounded">
                            <div className="flex flex-wrap gap-2">
                                {subCategoryData.category.map((cat, index) => {
                                    return (
                                        <p
                                            key={cat._id + "selectedValue"}
                                            className="bg-white shadow-md px-1 m-1 flex items-center gap-2"
                                        >
                                            {cat.name}
                                            <div
                                                className="cursor-pointer hover:text-red-600"
                                                onClick={() => handleRemoveCategorySelected(cat._id)}
                                            >
                                                <IoClose size={20} />
                                            </div>
                                        </p>
                                    );
                                })}
                            </div>

                            <select
                                className="w-full p-2 bg-transparent outline-none border"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const categoryDetails = allCategory.find(
                                        (el) => el._id == value
                                    );

                                    setSubCategoryData((prev) => {
                                        return {
                                            ...prev,
                                            category: [...prev.category, categoryDetails],
                                        };
                                    }
                                    );
                                }}
                            >
                                <option value={""}>Categorias</option>
                                {allCategory.map((category, index) => {
                                    return (
                                        <option
                                            value={category?._id}
                                            key={category._id + 'subCategory'}
                                        >
                                            {category?.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    <button
                        className={`
                            ${subCategoryData.name && subCategoryData.image
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

export default UploadSubCategoryModel