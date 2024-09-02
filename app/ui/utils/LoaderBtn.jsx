import { ThreeDots } from "react-loader-spinner";

import React from 'react'

const LoaderBtn = () => {
  return (
    <div className="flex justify-center items-center text-white">
        <ThreeDots
            visible={true}
            height="30"
            width="30"
            color= 'white'
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    </div>
   
    
  )
}

export default LoaderBtn