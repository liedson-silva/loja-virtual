import { useEffect, useState } from 'react'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import ProductCardAdmin from '../components/ProductCardAdmin';
import Loading from '../components/Loading';
import UploadProduct from '../components/UploadProduct';

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState('');
  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search
        }
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setProductData(responseData.data);
        setTotalPageCount(responseData.totalNoPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [page]);

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage(preve => preve + 1);
    }
  }

  const handlePrevious = () => {
    if (page > 1) {
      setPage(preve => preve - 1);
    }
  }

  useEffect(() => {
    let flag = true;

    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData();
        flag = false;
      }
    }, 300);
    return () => {
      clearTimeout(interval);
    };
  }, [search]);

  return (
    <section>
      <div className='p-4 bg-blue-50 rounded shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Produto</h2>
        <button
          onClick={() => setOpenUploadProduct(!openUploadProduct)}
          className='text-sm font-bold text-white min-w-20 border px-3 py-1 rounded-full bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 hover:opacity-90'>
          Adicionar
        </button>
      </div>

      {loading && (<Loading />)}

      <div className='p-4'>
        <div className='min-h-[55vh]'>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {productData.map((p, index) => {
              return (
                <ProductCardAdmin key={p._id} data={p} fetchProductData={fetchProductData} />
              )
            })}
          </div>
        </div>

        <div className='flex justify-between my-4'>
          <button onClick={handlePrevious} className='text-sm font-bold text-white min-w-20 border px-4 py-2 rounded-full bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 hover:opacity-90'>Anterior</button>
          <button>{page}/{totalPageCount}</button>
          <button onClick={handleNext} className='text-sm font-bold text-white min-w-20 border px-4 py-2 rounded-full bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 hover:opacity-90'>Próximo</button>
        </div>
      </div>

      {openUploadProduct && (
        <UploadProduct
          fetchProductData={fetchProductData}
          close={() => setOpenUploadProduct(false)}
        />
      )}
      
    </section>
  )
}

export default ProductAdmin