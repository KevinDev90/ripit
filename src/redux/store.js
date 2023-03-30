import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import gallerySlice from "./reducers/thunkSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    gallery: gallerySlice,
  },
});

export default store;
