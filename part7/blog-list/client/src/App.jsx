import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initBlogs } from "./reducers/blogsReducer";
import { Container, Typography } from "@mui/material";
import BlogList from "./components/BlogList";
import NavMenu from "./components/NavMenu";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import UsersInfo from "./components/UsersInfo";
import User from "./components/User";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
  }, []);

  return (
    <Container>
      <NavMenu />
      <Typography variant="h2" component="h1" gutterBottom>
        Blog App
      </Typography>
      <Notification />
      <Routes>
        <Route path="/" element={<Navigate replace to="/blogs" />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route
          path="/users"
          element={user ? <UsersInfo /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/users/:id"
          element={user ? <User /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Container>
  );
};

export default App;
