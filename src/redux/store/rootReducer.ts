import { combineReducers } from "@reduxjs/toolkit";
import playlistReducer from "../slices/playlistSlice";
import { categoryReducer } from "../slices/categoriesSlice";




export const rootReducer = combineReducers({
    playlist: playlistReducer,
    category:categoryReducer
})


 