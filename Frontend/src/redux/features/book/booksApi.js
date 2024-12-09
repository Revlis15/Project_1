import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token')
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const booksApi = createApi({
    reducerPath: 'bookApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => '/get-books',
            providesTags: ['Books']
        }),
        fetchBookById: builder.query({
            query: (id) => `/get-book/${id}`,
            providesTags: (result, error, id) => [{ type: 'Books', id }]
        }),
        addBook: builder.mutation({
            query: (newbook) => ({
                url: '/create-book',
                method: 'POST',
                body: newbook
            }),
            invalidatesTags: ['Books']
        }),
        updateBook: builder.mutation({
            query: ({ id, ...rest}) => ({
                url: `/edit/${id}`,
                method: 'PUT',
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Books', id }]
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Books']
        }),
    }),
})

export const { useFetchAllBooksQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation, useFetchBookByIdQuery } = booksApi
export default booksApi