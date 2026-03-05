import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import UploadAddress from '../components/uploadAddress'
import Loading from '../components/Loading'
import { IoTrashOutline, IoPencilOutline, IoLocationSharp, IoCallOutline } from "react-icons/io5"
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast'

const Address = () => {
  const [addressList, setAddressList] = useState([])
  const [loading, setLoading] = useState(false)
  const [openUploadAddress, setOpenUploadAddress] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState("")

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

  const deleteAddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteAddress,
        data: { addressId: selectedAddressId }
      })
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchAddress()
        setOpenDelete(false)
        setSelectedAddressId("")
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(() => {
    fetchAddress()
  }, [])

  return (
    <section className='min-h-[80vh]'>
      <div className='mb-6 p-4 bg-blue-50 rounded shadow-md flex items-center justify-between'>
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
            <div key={addr._id} className='bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-secondary-100/30 transition-all flex flex-col justify-between group'>

              <div>
                <div className='flex justify-between items-start mb-4'>
                  {addr.status ? (
                    <span className='bg-green-100 text-green-700 text-[10px] uppercase font-black px-2 py-1 rounded-md'>Principal</span>
                  ) : (
                    <span className='bg-gray-100 text-gray-400 text-[10px] uppercase font-black px-2 py-1 rounded-md'>Secundário</span>
                  )}

                  <div className='flex gap-1'>
                    <button className='p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'><IoPencilOutline size={20} /></button>
                    <button  onClick={() => {
                      setSelectedAddressId(addr._id);
                      setOpenDelete(true);
                    }} className='p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors'><IoTrashOutline size={20} /></button>
                  </div>
                </div>

                <div className='flex gap-3'>
                  <div className='mt-1 text-secondary-100'>
                    <IoLocationSharp size={22} />
                  </div>
                  <div className='space-y-1'>
                    <p className='font-bold text-gray-800 text-lg leading-tight'>{addr.address_line}</p>
                    <p className='text-gray-600 font-medium'>{addr.city}, {addr.state}</p>
                    <p className='text-sm text-gray-500'>CEP: {addr.pincode}</p>
                  </div>
                </div>
              </div>

              <div className='mt-6 pt-4 border-t border-gray-50 flex items-center justify-between'>
                <div className='flex items-center gap-2 text-gray-600'>
                  <IoCallOutline className='text-secondary-100' />
                  <span className='text-sm font-semibold'>{addr.mobile}</span>
                </div>
                <span className='text-[10px] font-bold text-gray-300 uppercase'>{addr.country}</span>
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

      {openDelete && (
        <ConfirmBox
          close={() => setOpenDelete(false)}
          cancel={() => setOpenDelete(false)}
          confirm={deleteAddress}
        />
      )}
    </section>
  )
}

export default Address