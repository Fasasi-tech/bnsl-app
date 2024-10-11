import React from 'react'
import ResetPassword from '../ui/resetPassword/ResetPassword'
import {Suspense} from "react";
const page = () => {
  return (
    <div className="mx-4 mt-4">
      <Suspense>
        <ResetPassword />
      </Suspense>
    </div>
  )
}

export default page