'use client'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { logout } from './authSlice';


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

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
  
    if (result.error && result.error.status === 401 ) {
      // Token expired, redirect to login
      api.dispatch(logout());
    }

    if (result.error && result.error.status === 403) {
      // Token expired, redirect to login
      api.dispatch(logout());
    }
 


  
    return result;
  };

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes:['Post', 'getStat','allProducts', 'vendorsResponse','notifications','vendor-product','vendor-history', 'vendors', 'singleHistory', 'singleUser','getAnalytics', 'exports','notificationStats', 'aggregate', 'polar', 'users', 'singleVendor', 'vendorProductAdmin', 'join', 'singleProducts', 'rfq-vendor', 'singlerfq', 'rfqResponses', 'singleRfqResponse', 'userprofile', 'updateme', 'vendor-self', 'product-log', 'product-history', 'productHistory', 'rfqs', 'group', 'customers', 'singleCustomer','permissions', 'getCustomer', 'category', 'singleGroup'],
    endpoints: (builder) => ({

    })
})