import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setNotification,
  setErrorNotification,
} from "../notification/notificationSlice";
import { createBlog } from "./blogsSlice";

const BlogForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createBlog({ title, author, url }))
      .unwrap()
      .then((blog) => {
        dispatch(
          setNotification(`A new blog ${title} by ${author} was created`)
        );
        navigate(`blogs/${blog.id}`);
      })
      .catch((error) => {
        dispatch(setErrorNotification(error.message));
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="blogTitle">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="blogAuthor">
        <Form.Label>Author:</Form.Label>
        <Form.Control
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="blogUrl">
        <Form.Label>Url:</Form.Label>
        <Form.Control
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </Form.Group>
      <Button className="mb-3" type="submit" variant="primary">
        Create
      </Button>
    </Form>
  );
};

export default BlogForm;
