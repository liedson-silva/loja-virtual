import React from 'react'
import { IoClose } from 'react-icons/io5'

const ConfirmBox = ({ cancel, confirm, close}) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
        <div className='bg-blue-100 max-w-md w-full p-4 rounded'>
            <div className='flex items-center justify-between'>
                <h1 className="flex gap-1 font-semibold">Deletar Permanente</h1>
                <button onClick={close}>
                    <IoClose size={25} />
                </button>
            </div>
            <p className='my-4'>Tem certeza que deseja deletar permanentemente?</p>
            <div className='flex items-center w-fit ml-auto gap-3'>
                <button
                    onClick={cancel}
                    className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors'
                >
                    Cancelar
                </button>
                <button
                    onClick={confirm}
                    className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors' 
                >
                    Confirmar
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmBox