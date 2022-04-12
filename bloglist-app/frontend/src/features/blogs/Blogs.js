import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogForm from "./BlogForm";
import Togglable from "../../components/Togglable";
import { fetchBlogs, selectAllBlogs } from "./blogsSlice";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectAllBlogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <>
      <h2 className="my-3">Blogs</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Blog</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Togglable buttonLabel="New blog">
        <BlogForm />
      </Togglable>
    </>
  );
};

export default Blogs;
