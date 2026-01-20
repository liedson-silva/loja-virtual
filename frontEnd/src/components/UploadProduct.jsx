import { useState } from "react";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import AddFieldComponent from "../components/AddFieldComponent";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";


const UploadProduct = ({ close, fetchProductData }) => {
    const [data, setData] = useState({
        name: '',
        image: [],
        category: [],
        subCategory: [],
        unit: '',
        stock: '',
        price: '',
        discount: '',
        description: '',
        more_details: {}
    });
    const [imageLoading, setImageLoading] = useState(false);
    const [viewImageUrl, setViewImageUrl] = useState('');
    const allCategory = useSelector((state) => state.product.allCategory);
    const allSubCategory = useSelector((state) => state.product.allSubCategory);
    const [openAddField, setOpenAddField] = useState(false);
    const [fieldName, setFieldName] = useState('');

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            };
        });
    }

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        setImageLoading(true);
        const response = await uploadImage(file);
        const { data: ImageResponse } = response;
        const imageUrl = ImageResponse.data.url;

        setData((preve) => {
            return {
                ...preve,
                image: [...preve.image, imageUrl]
            };
        });
        setImageLoading(false);
    };

    const handleDeleteImage = async (index) => {
        data.image.splice(index, 1);
        setData((preve) => {
            return {
                ...preve
            };
        });
    };

    const handleRemoveCategory = async (index) => {
        data.category.splice(index, 1);
        setData((preve) => {
            return {
                ...preve
            };
        });
    };

    const handleRemoveSubCategory = async (index) => {
        data.subCategory.splice(index, 1);
        setData((preve) => {
            return {
                ...preve
            };
        });
    };

    const handleAddField = () => {
        setData((preve) => {
            return {
                ...preve,
                more_details: {
                    ...preve.more_details,
                    [fieldName]: ''
                }
            };
        });
        setFieldName('');
        setOpenAddField(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios({
                ...SummaryApi.createProduct,
                data: data
            });
            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message);
                setData({
                    name: '',
                    image: [],
                    category: [],
                    subCategory: [],
                    unit: '',
                    stock: '',
                    price: '',
                    discount: '',
                    description: '',
                    more_details: {}
                });
            }
            close();
            if(fetchProductData){
                fetchProductData();
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center z-50'>
            <div className='bg-blue-100 max-w-4xl w-full p-4 rounded-lg max-h-[90vh] overflow-y-auto scrollbar-custom'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-bold'>Novo Produto</h1>
                    <button onClick={close} className='w-fit block ml-auto'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className='my-3 grid gap-2'>
                    <div className='grid gap-1'>
                        <label htmlFor="productName" className="flex gap-1 font-semibold">Nome: </label>
                        <input
                            type="text"
                            id="productName"
                            placeholder='Digite o nome do produto'
                            value={data.name}
                            name="name"
                            onChange={handleOnChange}
                            className='py-2 bg-blue-50 outline-none border rounded hover:border-primary-100'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="productDescription" className="flex gap-1 font-semibold">Descrição:</label>
                        <input
                            type="text"
                            id="productDescription"
                            placeholder='Digite a descrição do produto'
                            value={data.description}
                            name="description"
                            onChange={handleOnChange}
                            className='py-2 bg-blue-50 outline-none border rounded hover:border-primary-100'
                        />
                    </div>
                    <div className="grid gap-1">
                        <label className="flex gap-1 font-semibold ">Selecione a Categoria</label>
                        <div className="border focus-within:border-primary-100 rounded ">
                            <div className="flex flex-wrap gap-2">
                                {data.category.map((cat, index) => {
                                    return (
                                        <p
                                            key={cat._id + "selectedValue"}
                                            className="bg-white shadow-md px-1 m-1 flex items-center gap-2 "
                                        >
                                            {cat.name}
                                            <div
                                                className="cursor-pointer hover:text-red-600"
                                                onClick={() => handleRemoveCategory(cat._id)}
                                            >
                                                <IoClose size={20} />
                                            </div>
                                        </p>
                                    );
                                })}
                            </div>

                            <select
                                className="w-full p-2 bg-transparent outline-none border cursor-pointer"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const categoryDetails = allCategory.find(
                                        (el) => el._id == value
                                    );

                                    setData((prev) => {
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
                                            key={category._id}
                                        >
                                            {category?.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <label className="flex gap-1 font-semibold ">Selecione a Sub categoria</label>
                        <div className="border focus-within:border-primary-100 rounded ">
                            <div className="flex flex-wrap gap-2">
                                {data.subCategory.map((cat, index) => {
                                    return (
                                        <p
                                            key={cat._id + "selectedValue"}
                                            className="bg-white shadow-md px-1 m-1 flex items-center gap-2 "
                                        >
                                            {cat.name}
                                            <div
                                                className="cursor-pointer hover:text-red-600"
                                                onClick={() => handleRemoveSubCategory(cat._id)}
                                            >
                                                <IoClose size={20} />
                                            </div>
                                        </p>
                                    );
                                })}
                            </div>

                            <select
                                className="w-full p-2 bg-transparent outline-none border cursor-pointer"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const subCategoryDetails = allSubCategory.find(
                                        (el) => el._id == value
                                    );

                                    setData((prev) => {
                                        return {
                                            ...prev,
                                            subCategory: [...prev.subCategory, subCategoryDetails],
                                        };
                                    }
                                    );
                                }}
                            >
                                <option value={""}>Sub categorias</option>
                                {allSubCategory.map((subCategory, index) => {
                                    return (
                                        <option
                                            value={subCategory?._id}
                                            key={subCategory._id}
                                        >
                                            {subCategory?.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold">Foto:</p>
                        <div>
                            <label
                                htmlFor="productImage"
                                className="bg-blue-50 h-24 w-44 border rounded flex items-center justify-center cursor-pointer"
                            >
                                <div className="text-center flex items-center justify-center flex-col">
                                    {imageLoading ? (
                                        <Loading />
                                    ) : (
                                        <>
                                            <FaCloudUploadAlt size={35} />
                                            <p>Carregar Foto</p>
                                        </>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    id="productImage"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleUploadImage}
                                />
                            </label>

                            <div className="flex flex-wrap gap-4">
                                {data.image.map((img, index) => {
                                    return (
                                        <div
                                            key={img + index}
                                            className="h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group">
                                            <img
                                                alt={img}
                                                src={img}
                                                className="w-full h-full object-scale-down cursor-pointer"
                                                onClick={() => setViewImageUrl(img)}
                                            />
                                            <div
                                                onClick={() => handleDeleteImage(index)}
                                                className="absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer"
                                            >
                                                <MdDelete />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                        <div>
                            <label htmlFor="productUnit" className="flex gap-1 font-semibold">Unidade:</label>
                            <input
                                type="text"
                                id="productUnit"
                                placeholder='Digite a unidade do produto'
                                value={data.unit}
                                name="unit"
                                onChange={handleOnChange}
                                className='py-2 bg-blue-50 outline-none border rounded hover:border-primary-100'
                            />
                        </div>
                        <div>
                            <label htmlFor="productStock" className="flex gap-1 font-semibold">Quantidade em estoque:</label>
                            <input
                                type="text"
                                id="productStock"
                                placeholder='Digite a quantidade em estoque do produto'
                                value={data.stock}
                                name="stock"
                                onChange={handleOnChange}
                                className='py-2 bg-blue-50 outline-none border rounded hover:border-primary-100'
                            />
                        </div>
                        <div>
                            <label htmlFor="productPrice" className="flex gap-1 font-semibold">Preço:</label>
                            <input
                                type="text"
                                id="productPrice"
                                placeholder='Digite o preço do produto'
                                value={data.price}
                                name="price"
                                onChange={handleOnChange}
                                className='py-2 bg-blue-50 outline-none border rounded hover:border-primary-100'
                            />
                        </div>
                        <div>
                            <label htmlFor="productDiscount" className="flex gap-1 font-semibold">Desconto:</label>
                            <input
                                type="text"
                                id="productDiscount"
                                placeholder='Digite o desconto do produto'
                                value={data.discount}
                                name="discount"
                                onChange={handleOnChange}
                                className='py-2 bg-blue-50 outline-none border rounded hover:border-primary-100'
                            />
                        </div>
                    </div>
                    {Object.keys(data?.more_details)?.map((k, index) => {
                        return (
                            <div className="grid gap-1">
                                <label htmlFor={k} className="font-semibold">{k}</label>
                                <input
                                    type="text"
                                    id={k}
                                    value={data?.more_details[k]}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setData((preve) => {
                                            return {
                                                ...preve,
                                                more_details: {
                                                    ...preve.more_details,
                                                    [k]: value
                                                }
                                            };
                                        });
                                    }}
                                    required
                                    className='py-2 bg-blue-50 outline-none border rounded hover:border-primary-100'
                                />
                            </div>
                        )
                    })}

                    <div
                        onClick={() => setOpenAddField(true)}
                        className="text-sm font-bold text-white min-w-20 border px-3 py-2 rounded-full bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 hover:opacity-90 cursor-pointer py-1 px-3 w-60 text-center"
                    >
                        Adicionar Campos
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

            {viewImageUrl && (
                <ViewImage url={viewImageUrl} close={() => setViewImageUrl('')} />
            )}

            {openAddField && (
                <AddFieldComponent
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                    submit={handleAddField}
                    close={() => setOpenAddField(false)}
                />
            )}
        </section>
    )
}

export default UploadProduct