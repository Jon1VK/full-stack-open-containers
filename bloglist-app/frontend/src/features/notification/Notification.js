import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "./notificationSlice";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const dispatch = useDispatch();
  const { isError, message } = useSelector((state) => state.notification);
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);

    return () => clearTimeout(timeoutRef.current);
  }, [dispatch, message]);

  if (!message) return null;

  return (
    <Alert className="my-3" variant={isError ? "danger" : "success"}>
      {message}
    </Alert>
  );
};

export default Notification;
