import { useRef } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const BlogList = () => {
  const createFormRef = useRef();
  const blogs = useSelector((state) => state.blogs);

  // const linkStyle = {
  //   display: 'block',
  //   paddingTop: '.5em',
  //   border: '1px solid black',
  //   marginBottom: '.25em'
  // }

  return (
    <div>
      <Togglable buttonLabel="create new" ref={createFormRef}>
        <BlogForm />
      </Togglable>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogList;
