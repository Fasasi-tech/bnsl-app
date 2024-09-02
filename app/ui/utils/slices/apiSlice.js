import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: '/',
prepareHeaders: async(headers, {getState}) =>{
    const state = getState()
    const accessToken = state.auth?.userInfo?.token;

    if (accessToken){
        headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return headers;
}
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes:['Post', 'getStat','notifications','vendor-history', 'vendors', 'singleHistory', 'singleUser','getAnalytics', 'exports','notificationStats', 'aggregate', 'polar', 'users', 'singleVendor', 'vendorProductAdmin', 'join'],
    endpoints: (builder) => ({

    })
})