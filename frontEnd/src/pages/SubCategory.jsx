import { useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel';

const SubCategory = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);

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

      {openAddSubCategory && (
        <UploadSubCategoryModel
          fetchData={() => { }}
          closeModal={() => setOpenAddSubCategory(false)}
        />
      )}

    </section>
  )
}

export default SubCategory