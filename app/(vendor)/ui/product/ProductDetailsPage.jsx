import React from 'react'


const ProductDetailsPage = ({data, decodeHtml}) => {
  return (
    <div>
        <div className='mt-4' dangerouslySetInnerHTML={{ __html: decodeHtml(data) }} />
    </div>
  )
}

export default ProductDetailsPage