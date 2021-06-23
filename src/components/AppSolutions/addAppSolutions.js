import PropTypes from "prop-types";
import FullPageDialog from "../FullPageDialog";
import {
  Button,
  Grid,
  InputLabel,
  TextField,
  Card,
  Tooltip,
  ListItemSecondaryAction,
} from "@material-ui/core";
import GlobalStyles from "../../globalStyles";
import { useForm } from "./useForm";
import { fieldNames } from "../../Utils/formConstants";
import ServicesTable from "../Table.js/index";
import { useEffect, useState, useCallback } from "react";
import {
  deleteAppSolutionsApi,
  getAllAppSolutionsApi,
  getOneAppSolutionsApi,
} from "../../Utils/appSolutionsApi";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { PhotoCamera } from "@material-ui/icons";
import Toast from "../../components/Toast";

const AddAppSolutions = ({ open, handleClose }) => {
  const getAllAppSolutions = useCallback(async () => {
    let response = await getAllAppSolutionsApi();
    if (response.status === "success") {
      setRows(response.data.result);
    } else {
      setResponseMessage({
        status: response.status,
        message: response.message,
      });
      setAlertOpen(true);
    }
  }, []);

  const [id, setId] = useState(null);
  const {
    alertOpen,
    setAlertOpen,
    item,
    setItem,
    items,
    setItems,
    values,
    setValues,
    errors,
    update,
    setUpdate,
    handleInputChange,
    handleSubmit,
    resetForm,
    selectedFile,
    handleCapture,
    setSelectedFile,
    responseMessage,
    setResponseMessage,
    handleIconCapture,
    selectedIcon,
    setSelectedIcon,
    addItem,
    test,
  } = useForm(id);
  const { form, buttonWrap } = GlobalStyles();

  const [rows, setRows] = useState([]);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  useEffect(() => {
    getAllAppSolutions();
  }, [getAllAppSolutions]);

  const handleDelete = async (id) => {
    await deleteAppSolutionsApi(id)
      .then((response) => {
        console.log("response", response);
        if (response.status === "success") {
          getAllAppSolutions();
        }
        setResponseMessage({
          status: response.status,
          message: "Item Deleted Successfully",
        });
        setAlertOpen(true);
      })
      .catch((error) => {
        setResponseMessage({
          status: error.status,
          message: error.message,
        });
        setAlertOpen(true);
        console.error(error);
      });
  };

  const deleteItemByIndex = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);

    setItems(newItems);
  };

  const handleUpdate = async (id) => {
    setUpdate(true);
    setId(id);
    await getOneAppSolutionsApi(id)
      .then((response) => {
        console.log("res", response);
        if (response.status === "success") {
          setValues({
            id: response.data.result._id,
          });
          setItems(response.data.result.dataArray);
          setSelectedFile(response.data.result.image);
        }
        if (response.status === "fail") {
          console.log(response);
        }
      })
      .catch((error) => {
        setResponseMessage({
          status: error.status,
          message: error.message,
        });
        setAlertOpen(true);
      });
  };

  const valueskeys = {
    _id: "_id",
  };

  return (
    <FullPageDialog
      header="Manage App Solutions Section"
      open={open}
      handleClose={handleClose}
    >
      <Grid container justify="center">
        <Grid container item xs={12}>
          <form className={form} onSubmit={handleSubmit}>
            <Grid className={buttonWrap} item xs={12} md={6}>
              <input
                accept="image/png"
                name={fieldNames.image}
                style={{ display: "none" }}
                id="input-image"
                type="file"
                onChange={handleCapture}
              />
              <Tooltip title="Select Image">
                <label htmlFor="input-image">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera fontSize="large" />
                  </IconButton>
                </label>
              </Tooltip>
              <label>
                {selectedFile ? selectedFile.name : "Select Featured Image"}
              </label>
              <Card
                style={{
                  backgroundColor: "#eee",
                  padding: "20px",
                  margin: "0 50px",
                  minHeight: "180px",
                  maxHeight: "180px",
                  minWidth: "180px",
                }}
              >
                {typeof selectedFile === "string" ? (
                  <img
                    src={selectedFile}
                    height="80px"
                    width="auto"
                    alt=""
                    srcset=""
                  />
                ) : selectedFile && typeof selectedFile !== "string" ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    height="80px"
                    width="auto"
                    alt=""
                    srcset=""
                  />
                ) : null}
              </Card>
            </Grid>
            <Grid item container xs={12} md={6}>
              <Grid item xs={12}>
                <InputLabel id="input-title">Title</InputLabel>
                <TextField
                  name={fieldNames.title}
                  id="input-title"
                  variant="outlined"
                  placeholder="e.g Web Development"
                  value={item.title}
                  {...(errors && { error: true, helperText: errors.title })}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel id="input-description">Description</InputLabel>
                <TextField
                  name={fieldNames.description}
                  id="input-description"
                  variant="outlined"
                  placeholder="lorem ipsum...."
                  value={item.description}
                  {...(errors && {
                    error: true,
                    helperText: errors.description,
                  })}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid className={buttonWrap} item xs={12}>
                <input
                  accept="image/png"
                  name={fieldNames.icon}
                  style={{ display: "none" }}
                  id="input-icon"
                  type="file"
                  onChange={handleIconCapture}
                />
                <Tooltip title="Select Image">
                  <label htmlFor="input-icon">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera fontSize="large" />
                    </IconButton>
                  </label>
                </Tooltip>
                <label>
                  {selectedIcon ? selectedIcon.name : "Select Icon Image"}
                </label>
                <Card
                  style={{
                    backgroundColor: "#eee",
                    padding: "20px",
                    margin: "0 50px",
                    minHeight: "120px",
                    maxHeight: "120px",
                    minWidth: "120px",
                  }}
                >
                  {typeof selectedIcon === "string" ? (
                    <img
                      src={selectedIcon}
                      height="80px"
                      width="auto"
                      alt=""
                      srcset=""
                    />
                  ) : selectedIcon && typeof selectedIcon !== "string" ? (
                    <img
                      src={URL.createObjectURL(selectedIcon)}
                      height="80px"
                      width="auto"
                      alt=""
                      srcset=""
                    />
                  ) : null}
                </Card>
                <Button
                  style={{
                    minWidth: "120px",
                    maxHeight: "50px",
                  }}
                  variant="outlined"
                  color="success"
                  size="large"
                  onClick={addItem}
                >
                  Add Items
                </Button>
              </Grid>

              <List>
                {items &&
                  items.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText>{item.title}</ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton
                          color="warning"
                          onClick={() => deleteItemByIndex(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
              </List>
            </Grid>

            <Grid className={buttonWrap} item xs={12} md={6}>
              <Button
                type="submit"
                style={{
                  margin: "0 10px",
                  minWidth: "120px",
                  maxHeight: "50px",
                }}
                variant="contained"
                color="primary"
                size="large"
              >
                {update ? "Update" : "Add"} Item
              </Button>
              <Button
                style={{
                  margin: "0 10px",
                  minWidth: "120px",
                  maxHeight: "50px",
                }}
                variant="outlined"
                color="secondary"
                size="large"
                onClick={resetForm}
              >
                Reset
              </Button>
              <Button onClick={test}>Test</Button>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={10}>
          <ServicesTable
            rows={rows}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            valueskeys={valueskeys}
          />
        </Grid>
      </Grid>
      {responseMessage && (
        <Toast
          open={alertOpen}
          onClose={handleAlertClose}
          severity={responseMessage.status}
          message={responseMessage.message}
        />
      )}
    </FullPageDialog>
  );
};

AddAppSolutions.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddAppSolutions;
