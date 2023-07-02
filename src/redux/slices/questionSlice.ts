import { createSlice } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"
import { RootState } from "../store/store";

const questionSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuestions: builder.query<Question[], undefined>({
            query: () => `questions`,
            providesTags: ['Question'],
        }),
        getQuestionById: builder.query<Question, number>({
            query: (id) => `questions/${id}`,
            providesTags: ['Question'],
        }),

        updateQuestion: builder.mutation<Question, { data: UpdateQuestion, id: number }>({
            query: ({ data, id }) => ({
                url: `questions/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Question'],
        }),
        deleteQuestion: builder.mutation<Question, number>({
            query: (id) => ({
                url: `questions/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Question'],
        }),
        createQuestion: builder.mutation<Question, CreateQuestion>({
            query: (data) => ({
                url: `questions`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Question'],

        }),
    }),
})
export const questionCategory = createSlice({
    name: 'questionCategory',
    initialState: {
        selectedCategoryId: null,
        search: '',
        parentCategoryId: null,
      },
      reducers: {
        setSelectedCategoryId: (state, action) => {
          state.selectedCategoryId = action.payload;
        },
        setSearch: (state, action) => {
          state.search = action.payload;
        },
            setParentCategoryId: (state, action) => {
            state.parentCategoryId = action.payload;
        },
      }
  });
 
  export const selectQuestionCategory = (state:RootState) => state.rootReducer.questionCategory;
  export default questionCategory.reducer;
  
  export const {
    setSelectedCategoryId,
    setSearch,
    setParentCategoryId,
  } = questionCategory.actions;
  
  export const {
    useGetQuestionsQuery,
    useGetQuestionByIdQuery,
    useUpdateQuestionMutation,
    useDeleteQuestionMutation,
    useCreateQuestionMutation,
  } = questionSlice;