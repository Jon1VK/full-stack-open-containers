import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../store";
import blogService from "../../services/blogs";
import Blog from "./Blog";

jest.mock("../../services/blogs", () => ({
  __esModule: true,
  default: {
    update: jest.fn(),
  },
}));

describe(Blog, () => {
  let blogContainer;

  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "example.com",
    likes: 5,
    user: {
      id: 1,
      name: "Test User",
    },
  };

  beforeEach(() => {
    blogContainer = render(
      <Provider store={store}>
        <Blog blog={blog} user={blog.user} />
      </Provider>
    ).container;
  });

  test("Renders blog's title, author, url, likes and user's name", () => {
    expect(blogContainer).toHaveTextContent(blog.title);
    expect(blogContainer).toHaveTextContent(blog.author);
    expect(blogContainer).toHaveTextContent(blog.url);
    expect(blogContainer).toHaveTextContent(blog.likes);
    expect(blogContainer).toHaveTextContent(blog.user.name);
  });

  test("By default hides blog's details", () => {
    const blogDetails = blogContainer.querySelector(".blog__details");
    expect(blogDetails).toHaveStyle("display: none");
  });

  test("After clicking 'view'-button shows blog's details", () => {
    const button = screen.getByText("view");
    userEvent.click(button);
    const blogDetails = blogContainer.querySelector(".blog__details");
    expect(blogDetails).toHaveStyle("display: block");
  });

  test("After clicking the like button twice, the blogservice's update is called twice", async () => {
    const button = screen.getByText("like");
    userEvent.click(button);
    userEvent.click(button);
    await waitFor(() => expect(blogService.update).toHaveBeenCalledTimes(2));
  });
});
