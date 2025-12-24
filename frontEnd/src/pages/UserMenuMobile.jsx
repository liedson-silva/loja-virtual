import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoClose } from 'react-icons/io5'

const UserMenuMobile = () => {
  return (
    <section className='h-full w-full py-4 px-3'>
      <button onClick={() => window.history.back()} className='text-neutral-800 block w-fit ml-auto'>
        <IoClose />
      </button>
      <div className='container max-auto p-3 pb-8'>
        <UserMenu />
      </div>
    </section>
  )
}

export default UserMenuMobile