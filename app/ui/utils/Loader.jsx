import { ThreeDots } from "react-loader-spinner";

import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center text-orange-500">
        <ThreeDots
            visible={true}
            height="80"
            width="80"
            color='#FFB74D'
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    </div>
   
    
  )
}

export default Loader