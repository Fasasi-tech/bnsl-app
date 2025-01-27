import React from 'react'
import Roles from './Roles'

const Settings = () => {
  return (
    <div  className='grid grid-cols-1  lg:grid-cols-3 gap-2 '>
         <div className='border-gray-200 border-2 p-4 bg-white'>
           <Roles />
        </div>
    </div>
  )
}

export default Settings