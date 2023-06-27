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


const categoryState = createSlice({
    name: 'category',
    initialState: {
        search: '',
        selectedCategory: null,
    },
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload
        }
    }
})

export const { setSearch, setSelectedCategory } = categoryState.actions
export const categorySelector = (state: any) => state.category
export const categoryReducer = categoryState.reducer

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useCreateCategoryMutation,
} = categorySlice

