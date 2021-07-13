import { Grid, Button } from "@material-ui/core";
import React from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import useBlogs from "./useBlogs";
import Table from "../../components/Table.js/index";
import Toast from "../../components/Toast";

const Blogs = () => {
  const { isLoading, dataArray, createBlog, updateBlog, removeBlog, openToast, setOpenToast, responseMessage, toastType } = useBlogs();

  return (
    <Grid container>
      <LoadingSpinner open={isLoading} />
      <Button variant="contained" color="primary" onClick={() => createBlog()}>
        Create Blog
      </Button>
      <Table
        rows={dataArray}
        handleDelete={removeBlog}
        handleUpdate={updateBlog}
        // edit={() => console.log(dataArray)}
      />
      <Toast
          open={openToast}
          onClose={() => setOpenToast(false)}
          severity={toastType}
          message={responseMessage}
        />
    </Grid>
  );
};

export default Blogs;
