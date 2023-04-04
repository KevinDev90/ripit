import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import gallerySlice from "./reducers/thunkSlice";
import paquetSlice from "./reducers/paquetSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    gallery: gallerySlice,
    paquet: paquetSlice,
  },
});

export default store;
