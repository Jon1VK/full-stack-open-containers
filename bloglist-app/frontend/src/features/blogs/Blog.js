import { useEffect } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  setErrorNotification,
  setNotification,
} from "../notification/notificationSlice";
import {
  updateBlog,
  deleteBlog,
  selectBlogById,
  fetchBlog,
  createBlogComment,
} from "./blogsSlice";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const { blogId } = useParams();
  const blog = useSelector((state) => selectBlogById(state, blogId));

  useEffect(() => {
    dispatch(fetchBlog(blogId));
  }, [dispatch, blogId]);

  const likeBlog = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
      .unwrap()
      .then(() => {
        dispatch(setNotification(`You liked blog ${blog.title}`));
      });
  };

  const removeBlog = () => {
    dispatch(deleteBlog(blog))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  const addComment = (event) => {
    event.preventDefault();
    const comment = event.target.elements.comment.value;
    dispatch(createBlogComment({ blogId: blog.id, comment }))
      .unwrap()
      .then(() => {
        event.target.elements.comment.value = "";
        dispatch(setNotification(`You added a comment ${comment}`));
      })
      .catch((error) => dispatch(setErrorNotification(error.message)));
  };

  if (!blog) return null;

  return (
    <>
      <h2 className="my-3">{blog.title}</h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes{" "}
        <Button variant="success" onClick={likeBlog}>
          Like
        </Button>
      </p>
      <p>
        Added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
      </p>
      {blog.user.id === user.id && (
        <div>
          <Button variant="danger" onClick={removeBlog}>
            Delete
          </Button>
        </div>
      )}

      <h3 className="mt-3">Comments</h3>
      <ListGroup variant="flush">
        {blog.comments.map((comment, i) => (
          <ListGroup.Item className="ps-0" key={i}>
            - {comment}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form className="my-3" onSubmit={addComment}>
        <Form.Control type="text" name="comment" />
        <Button className="my-3" type="submit">
          Add Comment
        </Button>
      </Form>
    </>
  );
};

export default Blog;
