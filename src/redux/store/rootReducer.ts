import { combineReducers } from "@reduxjs/toolkit";
import playlistReducer from "../slices/playlistSlice";
import questionCategoryReducer from "../slices/questionSlice";



export const rootReducer = combineReducers({
    playlist: playlistReducer,
    questionCategory:questionCategoryReducer
})


 