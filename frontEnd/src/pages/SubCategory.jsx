import { useState, useEffect } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import DisplayTable from '../components/DisplayTable';
import { createColumnHelper } from '@tanstack/react-table'
import ViewImage from '../components/ViewImage';
import { HiPencil } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import EditSubCategory from '../components/EditSubCategory';
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast';

const SubCategory = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const [imageUrl, setImageUrl] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: ''
  });
  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: ''
  });
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false);

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

    columnHelper.accessor('_id', {
      header: 'Ação',
      cell: ({ row }) => {
        return (
          <div className='flex items-center justify-center gap-3'>
            <button onClick={() => {
              setOpenEdit(true)
              setEditData(row.original)
            }} className='p-2 bg-green-500 rounded-full hover:text-white'>
              <HiPencil size={20} />
            </button>
            <button onClick={() => {
              setOpenDeleteConfirmBox(true)
              setDeleteSubCategory(row.original)
            }} className='p-2 bg-red-100 rounded-full text-red-500 hover:text-white'>
              <MdDelete size={20} />
            </button>
          </div>
        )
      }
    }),
  ];

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory
      });

      const {data: responseData} = response
      if(responseData.success) {
        toast.success(responseData.message)
        fetchSubCategory()
        setOpenDeleteConfirmBox(false)
        setDeleteSubCategory({_id: ''})
      }
    } catch (error) {
      AxiosToastError(error);
    };
  };

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

      <div className='overflow-auto w-full max-w-[95vw]'>
        <DisplayTable
          data={data}
          column={column}
        />
      </div>

      {openAddSubCategory && (
        <UploadSubCategoryModel
          fetchData={fetchSubCategory}
          closeModal={() => setOpenAddSubCategory(false)}
        />
      )}

      {imageUrl && <ViewImage url={imageUrl} close={() => setImageUrl('')} />}

      {openEdit &&
        <EditSubCategory
          data={editData}
          fetchData={fetchSubCategory}
          close={() => setOpenEdit(false)}
        />
      }

      {openDeleteConfirmBox && (
        <ConfirmBox
          cancel={() => setOpenDeleteConfirmBox(false)}
          close={() => setOpenDeleteConfirmBox(false)}
          confirm={handleDeleteSubCategory}
        />
      )}

    </section>
  )
}

export default SubCategory