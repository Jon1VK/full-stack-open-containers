import { useEffect } from "react";
import Blogs from "../features/blogs/Blogs";
import Users from "../features/users/Users";
import User from "../features/users/User";
import LoginForm from "../features/session/LoginForm";
import Notification from "../features/notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/session/sessionSlice";
import { Route, Routes } from "react-router-dom";
import Blog from "../features/blogs/Blog";
import Header from "../components/Header";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return user ? (
    <div className="container mb-5">
      <Header />
      <Notification />
      <Routes>
        <Route index element={<Blogs />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:userId" element={<User />} />
        <Route path="blogs/:blogId" element={<Blog />} />
      </Routes>
    </div>
  ) : (
    <div className="container">
      <Header />
      <Notification />
      <h2 className="my-3">Log in to application</h2>
      <p>Test the app with already filled demo credentials</p>
      <LoginForm />
    </div>
  );
};

export default App;
