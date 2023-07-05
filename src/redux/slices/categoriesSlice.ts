import { createSlice } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"
import { RootState } from "../store/store";

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
        deleteCategory: builder.mutation<Category, number>({
            query: (id) => ({
                url: `categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
        createCategory: builder.mutation<Category, CreateCategory>({
            query: (data) => ({
                url: `categories`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Category'],

        }),
    }),
})
interface InnitialState {
    search: string,
    categoryId: number | null,
    parentCategoryId: number | null
}
const categoryState = createSlice({
    name: 'categoryState',
    initialState : {
        search: '',
        categoryId: null,
        parentCategoryId: null
    } as InnitialState,
    reducers: {
        setCategory: (state, action) => {
            state.categoryId = action.payload;
        },
        setParentCategory: (state, action) => {
            state.parentCategoryId = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    }
})

export const categorySelector = (state: RootState) => state.rootReducer.categoryState;
export default categoryState.reducer;

export const {
    setCategory, setParentCategory,setSearch
} = categoryState.actions;


export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useCreateCategoryMutation,
} = categorySlice

