import { combineReducers } from "@reduxjs/toolkit";
import playlistReducer from "../slices/playlistSlice";
import questionCategoryReducer from "../slices/questionSlice";
import categoryReducer from "../slices/categoriesSlice";


export const rootReducer = combineReducers({
    playlist: playlistReducer,
    categoryState: categoryReducer,
    questionCategory: questionCategoryReducer
})


