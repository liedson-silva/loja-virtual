import { useState, useEffect } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import DisplayTable from '../components/DisplayTable';
import { createColumnHelper } from '@tanstack/react-table'
import ViewImage from '../components/ViewImage';

const SubCategory = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const [imageUrl, setImageUrl] = useState('');

  const fetchSubCategory = async () => {
    setLoading(true);
    try {

      const response = await Axios({
        ...SummaryApi.getSubCategory
      });

      const { data: responseData } = response
      if (responseData.success) {
        setData(responseData.data)
      }

    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    fetchSubCategory()
  }, []);

  const column = [
    columnHelper.accessor('name', {
      header: 'Nome'
    }),
    columnHelper.accessor("image", {
      header: "Foto",
      cell: ({ row }) => {
        return (
          <div className='flex justify-center'>
            <img
              src={row.original.image}
              alt={row.original.name}
              className='w-14 h-14 cursor-pointer'
              onClick={() => {
                setImageUrl(row.original.image)
              }}
            />
          </div>
        )
      }
    }),
    columnHelper.accessor('category', {
      header: 'Categoria',
      cell: ({ row }) => {
        return (<>
          {row.original.category.map((c, index) => {
            return <p key={c._id + 'table'}>{c.name}</p>
          })}
        </>)
      }
    }),
  ];

  return (
    <section className='min-h-[80vh]'>
      <div className='p-4 bg-blue-50 rounded shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Sub Categoria</h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className='text-sm font-bold text-white min-w-20 border px-3 py-1 rounded-full bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 hover:opacity-90'>
          Adicionar
        </button>
      </div>

      <div>
        <DisplayTable
          data={data}
          column={column}
        />
      </div>

      {openAddSubCategory && (
        <UploadSubCategoryModel
          fetchData={() => { }}
          closeModal={() => setOpenAddSubCategory(false)}
        />
      )}

      {imageUrl && <ViewImage url={imageUrl} close={() => setImageUrl('')} />}

    </section>
  )
}

export default SubCategory