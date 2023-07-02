import { createSlice } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"

const categorySlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], undefined>({
            query: () => `categories`,
            providesTags: ['Category'],
        }),
        getCategoryById: builder.query<Category, number>({
            query: (id) => `categories/${id}`,
            providesTags: ['Category'],
        }),

        updateCategory: builder.mutation<Category, { data: UpdateCategory, id: number }>({
            query: ({ data, id }) => ({
                url: `categories/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation<Category,number>({
            query: (id) => ({
                url: `categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
        createCategory: builder.mutation<Category,CreateCategory>({
            query: (data) => ({
                url: `categories`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Category'],

        }),
    }),
})





export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useCreateCategoryMutation,
} = categorySlice

