import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import usersService from "../services/users";

const User = () => {
  const [user, setUser] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    usersService
      .getAll()
      .then((res) => res.find((user) => user.id === id))
      .then((res) => (res ? setUser(res) : null));
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
