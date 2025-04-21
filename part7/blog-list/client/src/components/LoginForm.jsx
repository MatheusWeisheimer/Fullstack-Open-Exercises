import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../reducers/userReducer";
import { failureNotification } from "../reducers/notificationReducer";
import { Typography, TextField, Button } from "@mui/material";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(username, password));
      navigate("/blogs");
    } catch (error) {
      dispatch(failureNotification("invalid username or password"));
    }
  };

  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Log in to application
      </Typography>
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "1em",
        }}
      >
        <div>
          <TextField
            label="Username"
            size="medium"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label="Password"
            size="medium"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant="contained" type="submit">
          login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
