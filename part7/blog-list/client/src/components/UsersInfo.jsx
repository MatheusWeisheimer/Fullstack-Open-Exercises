import { useState, useEffect } from "react";
import usersService from "../services/users";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

const UsersInfo = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    usersService
      .getAll()
      .then((res) => setUsers(res))
      .catch(({ message }) => console.error(message));
  }, []);

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersInfo;
