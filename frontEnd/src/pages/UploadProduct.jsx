import { useState } from "react";
import uploadImage from "../utils/uploadImage";
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


const UploadProduct = () => {
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
  const [selectCategory, setSelectCategory] = useState('');
  const [selectSubCategory, setSelectSubCategory] = useState('');
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState('');

  const handleChange = (e) => {
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
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      <div className='p-4 bg-blue-50 rounded shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Novo produto</h2>
      </div>
      <div className="grid p-3">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name" className="font-semibold">Nome</label>
            <input
              id="name"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              className="p-2 border rounded outline-none focus:border-secondary-100 bg-blue-50"
              placeholder="Digite o nome do produto"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="description" className="font-semibold">Descrição</label>
            <textarea
              id="description"
              type="text"
              name="description"
              value={data.description}
              onChange={handleChange}
              required
              multiple
              rows={3}
              className="p-2 border rounded outline-none focus:border-secondary-100 bg-blue-50"
              placeholder="Digite a descrição do produto"
            />
          </div>
          <div>
            <p className="font-semibold">Foto:</p>
            <div>
              <label
                htmlFor="productImage"
                className="bg-blue-50 h-24 border rounded flex items-center justify-center cursor-pointer"
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
          <div className="grid gap-1">
            <label className="font-semibold">Categoria</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find((el) => el._id === value);

                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, category]
                    };
                  });
                  setSelectCategory('');
                }}
              >
                <option value="">Selecione uma categoria</option>
                {allCategory.map((c, index) => {
                  return <option key={c?._id + "select-cat"} value={c?._id}>{c.name}</option>;
                })}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.category.map((c, index) => {
                  return (
                    <div
                      key={c._id + index + 'productsection'}
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                    >
                      <p>{c.name}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveCategory(index)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label className="font-semibold">Sub categoria</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find((el) => el._id === value);

                  setData((preve) => {
                    return {
                      ...preve,
                      subCategory: [...preve.subCategory, subCategory]
                    };
                  });
                  setSelectSubCategory('');
                }}
              >
                <option value="text-neutral-600">Selecione uma sub categoria</option>
                {allSubCategory.map((c, index) => {
                  return <option key={c?._id + "select-sub"} value={c?._id}>{c.name}</option>;
                })}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.subCategory.map((c, index) => {
                  return (
                    <div
                      key={c._id + index + 'productsection'}
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                    >
                      <p>{c.name}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveSubCategory(index)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="unit" className="font-semibold">Unidade</label>
            <input
              id="unit"
              type="text"
              name="unit"
              value={data.unit}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 border rounded outline-none focus-within:border-secondary-100"
              placeholder="Digite a unidade do produto"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="stock" className="font-semibold">Quantidade em estoque</label>
            <input
              id="stock"
              type="text"
              name="stock"
              value={data.stock}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 border rounded outline-none focus-within:border-secondary-100"
              placeholder="Digite a quantidade em estoque"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="price" className="font-semibold">Preço</label>
            <input
              id="price"
              type="text"
              name="price"
              value={data.price}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 border rounded outline-none focus-within:border-secondary-100"
              placeholder="Digite o preço do produto"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="discount" className="font-semibold">Desconto</label>
            <input
              id="discount"
              type="text"
              name="discount"
              value={data.discount}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 border rounded outline-none focus-within:border-secondary-100"
              placeholder="Digite o desconto do produto"
            />
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
                  className="bg-blue-50 p-2 border rounded outline-none focus-within:border-secondary-100"
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
          <button className="text-sm font-bold text-white min-w-20 border px-3 py-2 rounded-full bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 hover:opacity-90">
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