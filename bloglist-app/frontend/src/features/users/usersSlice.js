import userService from "../../services/users";
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => await userService.getAll()
);

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (userId) => await userService.getById(userId)
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: {
    [fetchUsers.fulfilled]: usersAdapter.upsertMany,
    [fetchUser.fulfilled]: usersAdapter.upsertOne,
  },
});

const usersReducer = usersSlice.reducer;

export default usersReducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users);
