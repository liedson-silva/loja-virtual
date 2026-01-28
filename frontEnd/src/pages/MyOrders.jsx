import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { DisplayPriceInBRL } from '../utils/DisplayPriceInBRL'
import Loading from '../components/Loading'

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await Axios({ ...SummaryApi.getOrdersByUser })
      if (response.data.success) {
        setOrders(response.data.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <section className='min-h-[80vh] '>
      <div className='p-4 bg-blue-50 rounded shadow-md flex items-center justify-between'>
        <h2 className='font-semibold p-1'>Meus Pedidos</h2>
      </div>

      <div className='mt-2'>
        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20'>
            <p className='text-gray-500 text-xl'>Você ainda não tem pedidos.</p>
          </div>
        ) : (
          <div>
            {orders.map((order) => (
              <div key={order._id} className='bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden'>
                <div className='bg-gray-50 p-4 border-b flex flex-wrap justify-between items-center gap-4'>
                  <div className='flex gap-8'>
                    <div>
                      <p className='text-[10px] uppercase font-bold text-gray-400 tracking-wider'>Data</p>
                      <p className='text-sm font-medium'>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className='text-[10px] uppercase font-bold text-gray-400 tracking-wider'>Total</p>
                      <p className='text-sm font-bold text-green-600'>{DisplayPriceInBRL(order.totalAmt)}</p>
                    </div>
                  </div>
                </div>

                <div className='p-4 grid md:grid-cols-2 gap-6'>
                  <div className='flex flex-col gap-4'>
                    <div className='flex flex-wrap gap-2'>
                      {order.product_details.map((product, index) => (
                        <div key={index} className='w-16 h-16 bg-white border rounded-lg p-1 group relative'>
                          <img
                            src={product.image?.[0]}
                            alt={product.name}
                            className='w-full h-full object-scale-down'
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 className='text-sm font-bold text-gray-700 mb-2'>Itens:</h4>
                      <ul className='text-sm text-gray-600 space-y-1'>
                        {order.product_details.map((product, index) => (
                          <li key={index} className='truncate'>• {product.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className='flex flex-col justify-center gap-3 md:border-l md:pl-6'>
                    <p className='text-xs text-gray-400 text-center md:text-left'>ID: {order.orderId}</p>
                    <button className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold text-sm transition-colors'>
                      Ver detalhes da compra
                    </button>
                    <button className='w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-lg font-bold text-sm transition-colors'>
                      Comprar novamente
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default MyOrders