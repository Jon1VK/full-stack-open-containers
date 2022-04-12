import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isError: false,
  message: "",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload;
      state.isError = false;
    },
    setErrorNotification: (state, action) => {
      state.message = action.payload;
      state.isError = true;
    },
    clearNotification: () => {
      return initialState;
    },
  },
});

export const { setNotification, setErrorNotification, clearNotification } =
  notificationSlice.actions;

const notificationReducer = notificationSlice.reducer;

export default notificationReducer;
