import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const paquetSlice = createSlice({
  name: "paquet",
  initialState,
  reducers: {
    addPaquet: (state, action) => {
      state.push(action.payload);
    },
    deletePaquet: (state, action) => {
      const index = state.findIndex((element) => element.id === action.payload);
      if (index !== -1) state.splice(index, 1);
    },
    editPaquet: (state, action) => {
      const item = action.payload;
      const editState = state.map((element) => {
        if (element.id === item.id) return { ...item };
        else return element;
      });
      return editState;
    },
    // editWord: (state, action) => {
    //   const item = action.payload;

    //   const editState = state.map((element) => {
    //     if (element.id === item.id) {
    //       const newItems = element.words.map((word) => {
    //         if (word.id === item.word) {
    //           return {
    //             ...word,
    //             ["pass"]: true,
    //           };
    //         }
    //         return word;
    //       });
    //       return {
    //         ...element,
    //         words: newItems,
    //       };
    //     }
    //     return element;
    //   });

    //   return editState;
    // },
  },
});

export const { addPaquet, deletePaquet, editPaquet } = paquetSlice.actions;
export default paquetSlice.reducer;
