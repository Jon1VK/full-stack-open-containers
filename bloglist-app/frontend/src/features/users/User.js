import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchUser, selectUserById } from "./usersSlice";

const User = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, userId));

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  if (!user) return null;

  return (
    <>
      <h2 className="my-3">{user.name}</h2>
      <h3>Added blogs</h3>
      <ListGroup variant="flush">
        {user.blogs.map((blog) => (
          <ListGroup.Item className="ps-0" key={blog.id}>
            - <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default User;
