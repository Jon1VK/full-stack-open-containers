import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Todo from "./Todo";

describe("When todo is not done", () => {
  const todo = {
    text: "Buy groceries",
    done: false,
  };

  let remove, complete;

  beforeEach(() => {
    remove = jest.fn();
    complete = jest.fn();
    render(<Todo todo={todo} complete={complete} remove={remove} />);
  });

  it("Right content is displayed", () => {
    screen.getByText("Buy groceries");
    screen.getByText("This todo is not done");
    screen.getByText("Delete");
    screen.getByText("Set as done");
  });

  it("Handler complete is called when 'Set as done' button is clicked", () => {
    fireEvent.click(screen.getByText("Set as done"));
    expect(complete.mock.calls.length).toBe(1);
  });

  it("Handler delete is called when 'Delete' button is clicked", () => {
    fireEvent.click(screen.getByText("Delete"));
    expect(remove.mock.calls.length).toBe(1);
  });
});

describe("When todo is done", () => {
  const todo = {
    text: "Buy groceries",
    done: true,
  };

  let remove, complete;

  beforeEach(() => {
    remove = jest.fn();
    complete = jest.fn();
    render(<Todo todo={todo} complete={complete} remove={remove} />);
  });

  it("Right content is displayed", () => {
    screen.getByText("Buy groceries");
    screen.getByText("This todo is done");
    screen.getByText("Delete");
    expect(screen.queryByText("Set as done")).not.toBeInTheDocument();
  });

  it("Handler delete is called when 'Delete' button is clicked", () => {
    fireEvent.click(screen.getByText("Delete"));
    expect(remove.mock.calls.length).toBe(1);
  });
});
