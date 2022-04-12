import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loginService from "../../services/login";

const initialState = { user: null };

export const loginUser = createAsyncThunk(
  "session/loginUser",
  async ({ username, password }, { dispatch }) => {
    const user = await loginService.login(username, password);
    dispatch(setUser(user));
  }
);

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      loginService.setToken(user.token);
      state.user = user;
    },
    logoutUser: (state) => {
      localStorage.removeItem("user");
      loginService.setToken(null);
      state.user = null;
    },
  },
});

export const { setUser, logoutUser } = sessionSlice.actions;

const sessionReducer = sessionSlice.reducer;

export default sessionReducer;
