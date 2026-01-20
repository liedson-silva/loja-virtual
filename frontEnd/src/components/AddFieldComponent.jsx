import React from 'react'
import { IoClose } from 'react-icons/io5'

const AddFieldComponent = ({ close, submit, value, onChange }) => {
    return (
        <section className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-900 bg-opacity-50 z-50 flex justify-center items-center p-4'>
            <div className='bg-blue-100 rounded p-4 w-full max-w-md'>
                <div className='flex items-center justify-between gap-3'>
                    <h1 className='font-semibold'>Adicionar Campo</h1>
                    <button onClick={close}> <IoClose size={25} /> </button>
                </div>
                <input
                    value={value}
                    onChange={onChange}
                    className="bg-blue-50 p-2 border my-3 outline-none w-full focus-within:border-secondary-100"
                />
                <button
                    onClick={submit}
                    className='bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 hover:opacity-90 text-white font-bold px-4 py-2 rounded mx-auto w-fit block '
                >Adicionar</button>
            </div>
        </section>
    )
}

export default AddFieldComponent