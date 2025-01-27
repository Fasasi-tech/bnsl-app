'use client'
import React, {useState} from 'react'
import CustomerEdit from './CustomerEdit'
import EditCustomer from './EditCustomer'

const CustomerProfile = ({data}) => {

    const [isEditing, setIsEditing] = useState(true)

  return (
    <>
        {isEditing ? <CustomerEdit data={data} isEditing={setIsEditing} /> : <EditCustomer data={data} isEditing={setIsEditing} />}
    </>
  )
}

export default CustomerProfile