import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos
        .map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            complete={() => completeTodo(todo)}
            remove={() => deleteTodo(todo)}
          />
        ))
        .reduce((acc, cur, i) => [...acc, <hr key={i} />, cur], [])}
    </>
  );
};

export default TodoList;
