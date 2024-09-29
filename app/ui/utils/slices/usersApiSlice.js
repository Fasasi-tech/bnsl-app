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
    rfqResponses:builder.query({
        query:(data) =>`${URL}/rfq/response`,
        providesTags:['rfqResponses']    
    }),
    analytics: builder.query({
        query:(data) => `${URL}/users/analytics`,
        providesTags:['getAnalytics']
    }),
    notificationStats: builder.query({
        query:(data) => `${URL}/notifications/stats`,
        providesTags:['notificationStats']
    }),
    usersSort: builder.query({
        query:(data) => `${URL}/users/aggregate`,
        providesTags:['aggregate']
    }),
    polar: builder.query({
        query:(data) => `${URL}/product/category`,
        providesTags:['polar']
    }),
    rfqvendor: builder.query({
        query:(data) => `${URL}/rfq`,
        providesTags:['rfq-vendor']
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
    singleUser: builder.query({
        query:(id) => `${URL}/users/${id}`,
        providesTags:['singleUser']
    }),

    singleRfqResponse: builder.query({
        query:(id) => `${URL}/rfq/response/${id}`,
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
    singleRfq:builder.query({
        query:(id)=>`${URL}/rfq/${id}`,
        providesTags:['singlerfq']
    }),
    singleProducts:builder.query({
        query:(id) =>`${URL}/product/${id}`,
        providesTags:['singleProducts']
    }),
    editUser: builder.mutation({
        query:({id, ...values}) =>({
        url: `${URL}/users/${id}`,
        method:'PATCH',
        body: values
    }),
  
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
    deleteVendor:builder.mutation({
        query:(id) =>({
            url: `${URL}/vendors/${id}`,
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
        query: ({page, limit, role, sort, search, active}) => {
            const params = new URLSearchParams();
            if (page) params.append('page', page);
            if (limit) params.append('limit', limit);
            if (role) params.append('role', role);
            if(sort) params.append('sort', sort);
            if (search) params.append('search', search)
            if (active !== undefined) params.append('active', active);

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

export const {useLoginMutation, useNotificationsQuery, useSingleVendorHistoryQuery, useVendorHistoryQuery, useDeleteVendorMutation, useVendorsLogQuery, useEmailtMutation, useLeftJoinQuery, useUpdateVendorMutation, useSingleVendorQuery, useVendorsQuery, useActivateUserMutation, useDeleteUserMutation,  useEditUserMutation, useSingleUserQuery,  useExportUserMutation, useCreateUserMutation, useListUsersQuery, usePolarQuery, useUsersSortQuery, useAnalyticsQuery, useNotificationStatsQuery, useForgotPasswordMutation, useResetPasswordMutation, useUsersStatQuery, useGetVendorProductQuery, useVendorProductadminQuery, usePostProductMutation, useAllProductsQuery, useSingleProductsQuery, useRfqrouteMutation, useLogoutMutation, useChangePasswordMutation, useRfqvendorQuery, useSingleRfqQuery, usePostResponseMutation, useRfqResponsesQuery, useSingleRfqResponseQuery, useUserprofileQuery, useUpdatemeMutation } = userApiSlice;