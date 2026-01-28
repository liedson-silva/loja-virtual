import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import UploadAddress from '../components/uploadAddress'
import Loading from '../components/Loading'
import { IoLocationOutline, IoTrashOutline, IoPencilOutline } from "react-icons/io5"

const Address = () => {
  const [addressList, setAddressList] = useState([])
  const [loading, setLoading] = useState(false)
  const [openUploadAddress, setOpenUploadAddress] = useState(false)

  const fetchAddress = async () => {
    try {
      setLoading(true)
      const response = await Axios({ ...SummaryApi.getAddress })
      if (response.data.success) {
        setAddressList(response.data.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAddress()
  }, [])

  return (
    <section className='min-h-[80vh]'>
      <div className='p-4 bg-blue-50 rounded shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Endereço</h2>
        <button
          onClick={() => setOpenUploadAddress(!openUploadAddress)}
          className='text-sm font-bold text-white min-w-20 border px-3 py-1 rounded-full bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 hover:opacity-90'>
          Adicionar
        </button>
      </div>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {loading ? (
          <Loading />
        ) : addressList.length === 0 ? (
          <div className='col-span-full flex flex-col items-center justify-center py-20 text-gray-500'>
            <p className='text-lg font-medium'>Nenhum endereço cadastrado.</p>
          </div>
        ) : (
          addressList.map((addr) => (
            <div key={addr._id} className='bg-white border border-blue-50 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group relative'>
              <div className='flex justify-between items-start'>
                <div className='space-y-1 pr-10'>
                  <p className='font-bold text-gray-800 leading-tight'>{addr.address_line}</p>
                  <p className='text-sm text-gray-600'>{addr.city}, {addr.state} - {addr.pincode}</p>
                  <p className='text-xs font-bold text-secondary-100 uppercase tracking-widest'>{addr.country}</p>
                  <p className='text-sm font-medium text-gray-400 pt-3'>📞 {addr.mobile}</p>
                </div>

                <div className='flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4'>
                  <button className='p-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100 shadow-sm transition-colors border border-blue-100' title="Editar">
                    <IoPencilOutline size={18} />
                  </button>
                  <button className='p-2 bg-red-50 rounded-full text-red-500 hover:bg-red-100 shadow-sm transition-colors border border-red-100' title="Excluir">
                    <IoTrashOutline size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {openUploadAddress && (
        <UploadAddress
          fetchData={fetchAddress}
          close={() => setOpenUploadAddress(false)}
        />
      )}
    </section>
  )
}

export default Address