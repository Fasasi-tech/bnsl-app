import React, {Suspense} from 'react'
import ResetPassword from '../ui/resetPassword/ResetPassword'
const page = () => {
  return (
    <div className="mx-4 mt-4">
      <Suspense  fallback={<div>Loading...</div>}>
        <ResetPassword />
      </Suspense>
    </div>
  )
}

export default page