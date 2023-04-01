import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import gallerySlice from "./reducers/thunkSlice";
import paquetSlice from "./reducers/paquetSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    gallery: gallerySlice,
    paquet: paquetSlice,
  },
});

export default store;
