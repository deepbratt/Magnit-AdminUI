import { Button, TextField, MenuItem } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import React from "react";
import DatePicker from "react-date-picker";
import LoadingSpinner from "../../components/LoadingSpinner";
import RichTextEditor from "../../components/RichTextEditor";
import Toast from "../../components/Toast";
import useAddEditBlog from "./useAddEditBlog";

const AddEditBlog = () => {
  const {
    cancelAddEdit,
    saveBlogData,
    handleChange,
    openToast,
    isLoading,
    toastType,
    responseMessage,
    formData,
    rawData,
    setRawData,
    setOpenToast,
    blogData,
    setFormData,
    formRef
  } = useAddEditBlog();
  return (
    <form ref={formRef}>
      <LoadingSpinner open={isLoading} />
      <Grid container alignItems="center" spacing={2}>
        <Grid item container xs={12} justify="flex-end">
          <Grid item container xs={6} justify="space-evenly">
            <Button variant="contained" color="primary" onClick={saveBlogData}>
              save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={cancelAddEdit}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="title"
            label="Title"
            type="text"
            variant="outlined"
            onChange={handleChange}
            value={formData.title}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="canonical"
            label="Canonical"
            type="text"
            variant="outlined"
            onChange={handleChange}
            value={formData.canonical}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="description"
            label="Description"
            type="text"
            variant="outlined"
            onChange={e=>handleChange(e)}
            value={formData.description}
            style={{ width: "100%" }}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="keywords"
            label="Keywords"
            type="text"
            variant="outlined"
            onChange={handleChange}
            value={formData.keywords}
            style={{ width: "100%" }}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="descriptionLong"
            label="Blog Description"
            type="text"
            variant="outlined"
            onChange={handleChange}
            value={formData.descriptionLong}
            style={{ width: "100%" }}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            name="date"
            label="Date"
            type="date"
            // variant="standard"
            // InputLabelProps={{ shrink: true }}
            
            onChange={(date)=>date && setFormData({name:"date", value:date})}
            value={formData.date}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="type"
            id="type"
            label="Type"
            variant="outlined"
            value={formData.type}
            onChange={handleChange}
            style={{ width: "100%" }}
            select
          >
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="publish">Publish</MenuItem>
          </TextField>
        </Grid>
        <Grid
          item
          xs={6}
          container
          justify="space-between"
          alignItems="center"
          spacing={0}
        >
          <Grid item xs={6}>
            <Button variant="contained" component="label">
              Upload Banner
              <input name="banner" type="file" hidden onChange={handleChange} />
            </Button>
            {/* <TextField
              variant="outlined"
              type="file"
              name="image"
              onChange={handleChange}
              style={{ width: "100%" }}
            /> */}
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex" }}
            container
            justify="center"
          >
            <div>
              {typeof formData.banner === "string" ? (
                <img src={formData.banner} height="auto" width="100px" alt="" />
              ) : formData.banner && typeof formData !== "string" ? (
                <img
                  src={URL.createObjectURL(formData.banner)}
                  height="auto"
                  width="100px"
                  alt=""
                />
              ) : (
                ""
              )}
              {/* {itemId && <img src={formData.image} height="auto" width="100px" />} */}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <RichTextEditor rawData={rawData} setRawData={setRawData} blogData={blogData} />
      <Toast
        open={openToast}
        onClose={() => setOpenToast(false)}
        severity={toastType}
        message={responseMessage}
      />
    </form>
  );
};

export default AddEditBlog;
/*
 */
