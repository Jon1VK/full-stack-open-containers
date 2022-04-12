import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import BlogForm from "./BlogForm";
import store from "../../store";

jest.mock("../../services/blogs", () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
  },
}));

describe(BlogForm, () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "example.com",
  };

  test("Calls onSuccess with right details after clicking the create button", async () => {
    const handleSuccess = jest.fn();
    render(
      <Provider store={store}>
        <BlogForm onSuccess={handleSuccess} />
      </Provider>
    );
    const titleInput = screen.getByRole("textbox", { name: /title/i });
    const authorInput = screen.getByRole("textbox", { name: /author/i });
    const urlInput = screen.getByRole("textbox", { name: /url/i });
    userEvent.type(titleInput, blog.title);
    userEvent.type(authorInput, blog.author);
    userEvent.type(urlInput, blog.url);
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() => expect(handleSuccess).toHaveBeenCalledTimes(1));
  });
});
