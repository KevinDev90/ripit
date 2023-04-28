import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import gallerySlice from "./reducers/thunkSlice";
import paquetSlice from "./reducers/paquetSlice";
import wordsSlice from "./reducers/wordsSlice";
import notesSlice from "./reducers/notesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    gallery: gallerySlice,
    paquet: paquetSlice,
    words: wordsSlice,
    notes: notesSlice,
  },
});

export default store;
