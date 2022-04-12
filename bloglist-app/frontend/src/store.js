import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./features/blogs/blogsSlice";
import notificationReducer from "./features/notification/notificationSlice";
import sessionReducer from "./features/session/sessionSlice";
import usersReducer from "./features/users/usersSlice";

const store = configureStore({
  reducer: {
    session: sessionReducer,
    notification: notificationReducer,
    users: usersReducer,
    blogs: blogsReducer,
  },
});

export default store;
