import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useSelector } from 'react-redux';

const EditProductAdmin = ({ close, fetchData, data: productData }) => {
  const [data, setData] = useState({
    _id: productData._id,
    name: productData.name,
    description: productData.description,
    image: productData.image,
    category: productData.category,
    subCategory: productData.subCategory,
    unit: productData.unit,
    price: productData.price,
    stock: productData.stock,
    discount: productData.discount,
    more_details: productData.more_details
  });
  const [loading, setLoading] = useState(false);
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const response = await Axios({
        ...SummaryApi.updateProduct,
        data: data
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    setLoading(false);

    setData((preve) => {
      return {
        ...preve,
        image: ImageResponse.data.url
      };
    });
  }

  const handleRemoveCategorySelected = (categoryId) => {
    const index = data.category.findIndex(
      (el) => el._id === categoryId
    );

    data.category.splice(index, 1);
    setData((preve) => {
      return {
        ...preve
      };
    });
  };

  const handleRemoveSubCategorySelected = (subcategoryId) => {
    const index = data.subCategory.findIndex(
      (el) => el._id === subcategoryId
    );

    data.subCategory.splice(index, 1);
    setData((preve) => {
      return {
        ...preve
      };
    });
  };

  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
      <div className='bg-blue-100 max-w-4xl w-full p-4 rounded'>
        <div className='flex items-center justify-between'>
          <h1 className='font-bold'>Atualizar produto</h1>
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
                        onClick={() => handleRemoveCategorySelected(cat._id)}
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
                        onClick={() => handleRemoveSubCategorySelected(cat._id)}
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
          <div className='grid gap-1'>
            <p className="flex gap-1 font-semibold">Foto:</p>
            <div className='flex gap-4 flex-col lg:flex-row items-center'>
              <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded'>
                {data.image ? (
                  <img
                    alt='category'
                    src={data.image}
                    className='w-full h-full object-scale-down'
                  />
                ) : (
                  <p className='text-sm text-neutral-500'>Sem Foto</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`
                                        ${data.name
                      ? 'text-sm cursor-pointer font-bold text-white min-w-20 border px-3 py-1 rounded-full bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 hover:opacity-90'
                      : 'text-sm bg-gray-500 text-white px-3 py-1 rounded-full font-bold'
                    }
                                    `}>
                  Carregar Foto
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  type="file"
                  id='uploadCategoryImage'
                  className='hidden'
                />
              </label>
            </div>
          </div>
          <div className='grid gap-1'>
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
          <div className='grid gap-1'>
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
          <div className='grid gap-1'>
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
          <div className='grid gap-1'>
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
    </section>
  )
}

export default EditProductAdmin