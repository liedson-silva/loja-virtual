import React from 'react'
import noDataImage from '../assets/ball.png';

const NoData = () => {
  return (
    <div className='flex flex-col items-center justify-center p-4 gap-2'>
        <img 
        src={noDataImage} 
        alt="No Data" 
        className='w-20 h-20 object-contain'
        />
        <p className='text-neutral-500'>Sem Dados</p>
    </div>
  )
}

export default NoData