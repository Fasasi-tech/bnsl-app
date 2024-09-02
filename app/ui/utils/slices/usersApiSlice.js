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
   
    singleVendor:builder.query({
        query:(id) =>`${URL}/vendors/${id}`,
        providesTags:['singleVendor']
    }),
    singleVendorHistory:builder.query({
        query:(id)=>`${URL}/vendors/history/${id}`,
        providesTags:['singleHistory']
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
    deleteVendor:builder.mutation({
        query:(id) =>({
            url: `${URL}/vendors/${id}`,
            method:'DELETE'
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
    createUser: builder.mutation({
        query:(data) =>({
            url: `${URL}/auth/`,
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
      })


   }) 
})

export const {useLoginMutation, useNotificationsQuery, useSingleVendorHistoryQuery, useVendorHistoryQuery, useDeleteVendorMutation, useVendorsLogQuery, useEmailtMutation, useLeftJoinQuery, useUpdateVendorMutation, useSingleVendorQuery, useVendorsQuery, useActivateUserMutation, useDeleteUserMutation,  useEditUserMutation, useSingleUserQuery,  useExportUserMutation, useCreateUserMutation, useListUsersQuery, usePolarQuery, useUsersSortQuery, useAnalyticsQuery, useNotificationStatsQuery, useForgotPasswordMutation, useResetPasswordMutation, useUsersStatQuery, useVendorProductadminQuery} = userApiSlice;