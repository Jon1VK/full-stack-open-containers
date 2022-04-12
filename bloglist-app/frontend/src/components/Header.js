import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../features/session/sessionSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  return user ? (
    <Navbar bg="light" expand="lg">
      <Container className="justify-content-between">
        <Navbar.Brand>
          <Link to="/">Blogs App</Link>
        </Navbar.Brand>
        <Navbar.Text>
          {user.name} logged in{" "}
          <Button onClick={() => dispatch(logoutUser())}>Logout</Button>
        </Navbar.Text>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="flex-lg-grow-0" id="basic-navbar-nav">
          <Nav>
            <Nav.Link as="span">
              <Link to="/">Blogs</Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link to="/users">Users</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>Blogs App</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
