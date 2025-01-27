import { apiSlice } from "./apiSlice";

const URL ='http://localhost:8000/api/v1'
//`${URL}/users?page=${page}&limit=${limit}`

export const userApiSlice = apiSlice.injectEndpoints({
   endpoints:(builder) => ({
    login:builder.mutation({
        query:(data) =>({
            url:`${URL}/auth/login`,
            method:'POST',
            body:data
        })
    }),
    forgotPassword:builder.mutation({
        query:(data) =>({
            url:`${URL}/auth/forgotPassword`,
            method:'POST',
            body:data
        })
    }),
    createRfq:builder.mutation({
        query:(data) =>({
            url:`${URL}/customerRfqs/`,
            method:'POST',
            body:data
        })
    }),
    postVendorResponse:builder.mutation({
        query:(data) =>({
            url:`${URL}/responses/`,
            method:'POST',
            body:data
        })
    }),
    resetPassword:builder.mutation({
        query:({data, token}) =>({
            url:`${URL}/auth/resetPassword/${token}`,
            method:'PATCH',
            body:data
        })
    }),
    usersStat:builder.query({
        query:(data) =>`${URL}/users/stat`,
        providesTags:['getStat']    
    }),
    userprofile:builder.query({
        query:(data) =>`${URL}/users/profile`,
        providesTags:['userprofile']    
    }),
    customerprofile:builder.query({
        query:() =>`${URL}/customers/self`,
        providesTags:['getCustomer']
    }),
    vendorsresponse:builder.query({
        query:() => `${URL}/responses/vendor/response`,
        providesTags:['vendorsResponse']
    }),
    rfqResponses:builder.query({
        query:({page, limit, search}) =>{
            const params = new URLSearchParams();
            if (search) params.append('search', search)
            if (page) params.append('page', page);
            if (limit) params.append('limit', limit);
            return `${URL}/responses/responses?${params.toString()}` },
        providesTags:['rfqResponses']    
    }),
    rfqs:builder.query({
        query:({page, limit, search}) =>{
            const params = new URLSearchParams();
            if (search) params.append('search', search)
            if (page) params.append('page', page);
            if (limit) params.append('limit', limit);
            return  `${URL}/customerRfqs/rfqs?${params.toString()}` 
        },
        providesTags:['rfqs']   
    }),
    
    analytics: builder.query({
        query:() => `${URL}/users/analytics`,
        providesTags:['getAnalytics']
    }),
    notificationStats: builder.query({
        query:() => `${URL}/notifications/stats`,
        providesTags:['notificationStats']
    }),
    usersSort: builder.query({
        query:() => `${URL}/users/aggregate`,
        providesTags:['aggregate']
    }),
    polar: builder.query({
        query:() => `${URL}/categories/aggregate`,
        providesTags:['polar']
    }),
    categories: builder.query({
        query:() => `${URL}/categories`,
        providesTags:['category']
    }),
    rfqvendor: builder.query({
        query:() => `${URL}/customerRfqs`,
        providesTags:['rfq-vendor']
    }),
    productlog: builder.query({
        query:(data) => `${URL}/productLog/log`,
        providesTags:['product-log']
    }),
    getVendorSelf: builder.query({
        query:(data) => `${URL}/vendors/self`,
        providesTags:['vendor-self']
    }),
    customer: builder.query({
        query:({page, limit, search}) =>{
            const params = new URLSearchParams();
            if (page) params.append('page', page);
            if (limit) params.append('limit', limit);
            if (search) params.append('search', search)

            return `${URL}/customers?${params.toString()}`
        },
        providesTags:['customers']
    }),
    permissions:builder.query({
        query:(data) => `${URL}/permissions`,
        providesTags:['permissions']
    }),
    vendorHistory:builder.query({
        query: ({page, limit, sort, search}) => {
            const params = new URLSearchParams();
            if (page) params.append('page', page);
            if (limit) params.append('limit', limit);
            if(sort) params.append('sort', sort);
            if (search) params.append('search', search)

            return `${URL}/vendors/history?${params.toString()}`;
        },
        providesTags:['vendor-history']
    }),
    productHistory:builder.query({
        query: ({page, limit, sort, search}) => {
            const params = new URLSearchParams();
            if (page) params.append('page', page);
            if (limit) params.append('limit', limit);
            if(sort) params.append('sort', sort);
            if (search) params.append('search', search)

            return `${URL}/productLog/log?${params.toString()}`;
        },
        providesTags:['product-history']
    }),
    singleUser: builder.query({
        query:(id) => `${URL}/users/${id}`,
        providesTags:['singleUser']
    }),

    singleRfqResponse: builder.query({
        query:(id) => `${URL}/responses/responses/${id}`,
        providesTags:['singleRfqResponse']
    }),
    singleVendor:builder.query({
        query:(id) =>`${URL}/vendors/${id}`,
        providesTags:['singleVendor']
    }),
    getVendorProduct:builder.query({
        query:({page, limit, category, search}) => {
            const params = new URLSearchParams();
            if (page) params.append('page', page);
            if (limit) params.append('limit', limit);
            if (search) params.append('search', search);
            if (category) params.append('category', category);
            return `${URL}/product/vendor-product?${params.toString()}`},
            providesTags:['vendor-product']
    }),
    singleVendorHistory:builder.query({
        query:(id)=>`${URL}/vendors/history/${id}`,
        providesTags:['singleHistory']
    }),
    singleProductHistory:builder.query({
        query:(id)=>`${URL}/productLog/${id}`,
        providesTags:['productHistory']
    }),
    singleRfq:builder.query({
        query:(id)=>`${URL}/customerRfqs/${id}`,
        providesTags:['singlerfq']
    }),
    group:builder.query({
        query:(data)=>`${URL}/groups`,
        providesTags:['group']
    }),
   
    singleProducts:builder.query({
        query:(id) =>`${URL}/product/${id}`,
        providesTags:['singleProducts']
    }),
    singleCustomer:builder.query({
        query:(id) =>`${URL}/customers/${id}`,
        providesTags:['singleCustomer']
    }),

    singleRoles:builder.query({
        query:(id) => `${URL}/groups/${id}`,
        providesTags:['singleGroup']
    }),
    editUser: builder.mutation({
        query:({id, ...values}) =>({
        url: `${URL}/users/${id}`,
        method:'PATCH',
        body: values
    }),
    
    }),
    editProduct: builder.mutation({
        query:({id, ...values}) =>({
        url: `${URL}/product/${id}`,
        method:'PATCH',
        body: values
    }),

    
    
    }),
    editCustomer:builder.mutation({
        query:({id, ...values}) =>({
            url:`${URL}/customers/${id}`,
            method:'PATCH',
            body:values
        })
    }),
    activateUser: builder.mutation({
        query:(id) =>({
            url:`${URL}/users/reactivate/${id}`,
            method:'PATCH'
        })
    }),
    updateVendor:builder.mutation({
        query:({id, ...values}) =>({
            url:`${URL}/vendors/${id}`,
            method:'PATCH',
            body:values
        })
    }),
    updateme: builder.mutation({
        query:(values) =>({
          url: `${URL}/users/me`,
          method:'PATCH',
          body:values
        }) 
    }),
    postGroup: builder.mutation({
        query:(values) =>({
          url:`${URL}/groups`,
          method:'POST',
          body:values
        })
    }),
    updateBusiness: builder.mutation({
        query:(values) =>({
          url: `${URL}/vendors`,
          method:'PATCH',
          body:values
        }) 
    }),
    updateCustomerSelf: builder.mutation({
        query:(values) =>({
          url: `${URL}/customers/self`,
          method:'PATCH',
          body:values
        }) 
    }),
    createVendor: builder.mutation({
        query:(values) =>({
          url: `${URL}/vendors/`,
          method:'POST',
          body:values
        }) 
    }),
    deleteVendor:builder.mutation({
        query:(id) =>({
            url: `${URL}/vendors/${id}`,
            method:'DELETE'
        })

    }),
    deleteGroup:builder.mutation({
        query:(id) =>({
            url: `${URL}/groups/${id}`,
            method:'DELETE'
        })

    }),
    deleteProduct:builder.mutation({
        query:(id) =>({
            url: `${URL}/product/${id}`,
            method:'DELETE'
        })

    }),
    rfqroute:builder.mutation({
        query:({id, ...values}) =>({
            url:`${URL}/product/${id}/rfq`,
            method:"POST",
            body:values
        })
    }),
    ratings:builder.mutation({
        query:({id, ...values}) =>({
            url:`${URL}/product/${id}/reviews`,
            method:"POST",
            body:values
        })
    }),
    
    notifications:builder.query({
        query:({id, page, limit})=>{
            const params = new URLSearchParams();
            if (page) params.append('page', page);
            if (limit) params.append('limit', limit);
            return `${URL}/notifications?${params.toString()}`
        },
        provideTags:['notifications']
    }),
    deleteUser: builder.mutation({
        query: (id) =>({
            url: `${URL}/users/delete/${id}`,
            method:'DELETE'
        })
    }),
    listUsers:builder.query({
        query: ({page, limit,search}) => {
            const params = new URLSearchParams();
            if (page) params.append('page', page);
            if (limit) params.append('limit', limit);
            if (search) params.append('search', search)
           

            return `${URL}/users?${params.toString()}`;
        },
        providesTags:['users']
    }),
    leftJoin: builder.query({
        query: ({ searchText }) => {
            const params = new URLSearchParams();
            if (searchText) params.append('searchText', searchText);

            return `${URL}/users/join?${params.toString()}`;
        },
        providesTags: ['join']
    }),

    vendorProductadmin: builder.query({

        query:({id, page, limit}) =>{
            const params = new URLSearchParams();
            if (page) params.append('page', page);
            if (limit) params.append('limit', limit)

            return `${URL}/product/vendor-product/${id}?${params.toString()}`;
    },
        providesTags:['vendorProductAdmin']
    
    }),
    allProducts:builder.query({
        query:({page, limit, category, search})=>{
            const params = new URLSearchParams();
            if (page) params.append('page', page);
            if (limit) params.append('limit', limit);
            if (search) params.append('search', search)
                if (category) params.append('category', category)

            return `${URL}/product?${params.toString()}`
        },
        providesTags:['allProducts']
    }),
    createUser: builder.mutation({
        query:(data) =>({
            url: `${URL}/auth/`,
            method:'POST',
            body:data

        })
    }),
    createCustomer:builder.mutation({
        query:(data)=>({
            url: `${URL}/customers/`,
            method:'POST',
            body:data
        })
    }),
    postProduct: builder.mutation({
        query:(data) =>({
            url: `${URL}/product`,
            method:'POST',
            body:data

        })
    }),
    postResponse: builder.mutation({
        query:(data) =>({
          url: `${URL}/rfq/response`,
          method:'POST',
          body:data
        })
    }),
    emailt: builder.mutation({
        query:(emailData) =>({
            url: `${URL}/users/message`,
            method:'POST',
            body:emailData

        })
    }),
    logout:builder.mutation({
        query:() =>({
            url:`${URL}/users/logout`,
            method:'POST'
        })
    }),
    changePassword:builder.mutation({
        query:(data) =>({
            url:`${URL}/users/password`,
            method:'PATCH',
            body:data
        })
    }),
    exportUser: builder.mutation({
        query: () => ({
          url: `${URL}/users/export`,
          method: 'GET',
          responseHandler: async (response) => {
            const blob = await response.blob();
            return { blob };
          },
        })
      }),
      vendors: builder.query({
        query: ({page, limit, sort, search, vendor_class}) => {
            const params = new URLSearchParams();
            if (page) params.append('page', page);
            if (limit) params.append('limit', limit);
            if(sort) params.append('sort', sort);
            if (search) params.append('search', search)
            if (vendor_class) params.append('vendor_class', vendor_class)

            return `${URL}/vendors?${params.toString()}`;
        },
        providesTags:['vendors']
      }),
      vendorsLog: builder.query({
        query: ({page, limit, sort, search}) => {
            const params = new URLSearchParams();
            if (page) params.append('page', page);
            if (limit) params.append('limit', limit);
            if(sort) params.append('sort', sort);
            if (search) params.append('search', search)

            return `${URL}/vendors/history?${params.toString()}`;
        },
        providesTags:['vendorshistory']
      }),
   }) 
})

export const {useVendorsresponseQuery, useLoginMutation, useCategoriesQuery, useCreateRfqMutation ,useEditCustomerMutation, useCreateCustomerMutation, useNotificationsQuery, useSingleVendorHistoryQuery, useVendorHistoryQuery, useDeleteVendorMutation, useVendorsLogQuery, useEmailtMutation, useLeftJoinQuery, useUpdateVendorMutation, useSingleVendorQuery, useVendorsQuery, useActivateUserMutation, useDeleteUserMutation,  useEditUserMutation, useSingleUserQuery,  useExportUserMutation, useCreateUserMutation, useListUsersQuery, usePolarQuery, useUsersSortQuery, useAnalyticsQuery, useNotificationStatsQuery, useForgotPasswordMutation, useResetPasswordMutation, useUsersStatQuery, useGetVendorProductQuery, useVendorProductadminQuery, usePostProductMutation, useAllProductsQuery, useSingleProductsQuery, useRfqrouteMutation, useLogoutMutation, useChangePasswordMutation, useRfqvendorQuery, useSingleRfqQuery, usePostResponseMutation, useRfqResponsesQuery, useSingleRfqResponseQuery, useUserprofileQuery, useUpdatemeMutation, useEditProductMutation, useCreateVendorMutation, useGetVendorSelfQuery, useUpdateBusinessMutation, useProductlogQuery, useProductHistoryQuery, useSingleProductHistoryQuery, useRatingsMutation, useDeleteProductMutation, useRfqsQuery, useGroupQuery, useCustomerQuery, useSingleCustomerQuery, usePermissionsQuery, useCustomerprofileQuery, useUpdateCustomerSelfMutation, usePostVendorResponseMutation, usePostGroupMutation, useSingleRolesQuery, useDeleteGroupMutation } = userApiSlice;