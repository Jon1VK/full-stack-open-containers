import { useState } from "react";
import { Button } from "react-bootstrap";

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <Button style={hideWhenVisible} onClick={toggleVisibility}>
        {buttonLabel}
      </Button>
      <div style={showWhenVisible}>
        {children}
        <Button onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  );
};

export default Togglable;
