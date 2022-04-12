import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./sessionSlice";
import {
  setNotification,
  setErrorNotification,
} from "../notification/notificationSlice";
import { Button, Form } from "react-bootstrap";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ username, password }))
      .unwrap()
      .then(() => {
        dispatch(setNotification(`${username} was logged in`));
      })
      .catch((error) => {
        dispatch(setErrorNotification(error.message));
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button className="my-3" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
