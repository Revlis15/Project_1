import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: (builder.mutation) ({
            query: (newOrder) => ({
                url: '/create-order',
                method: 'POST',
                body: newOrder,
                credentials: 'include'
            }),
            invalidatesTags: ['Orders']
        }),
        getOrderByEmail: (builder.query) ({
            query: (email) =>({ 
                url: `/email/${email}` 
            }),
            providesTags: ['Orders']
        }),
    }),
})

export const { useCreateOrderMutation, useGetOrderByEmailQuery } = ordersApi
export default ordersApi