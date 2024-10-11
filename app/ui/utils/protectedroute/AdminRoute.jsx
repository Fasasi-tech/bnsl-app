'use client'
import React from 'react'
import {useSelector} from 'react-redux'



const AdminRoute = ({children}) => {
    // const router = useRouter();
    const {userInfo} = useSelector((state) =>state.auth)
  return (
    userInfo && (userInfo.data.user.role==='admin' || userInfo.data.user.role==='superAdmin'|| userInfo.data.user.role==='R.O.A' ) && children
  )
}
export default AdminRoute