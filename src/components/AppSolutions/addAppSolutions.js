import PropTypes from "prop-types";
import {
  Button,
  Grid,
  InputLabel,
  TextField,
  Card,
  Tooltip,
  ListItemSecondaryAction,
  Typography,
} from "@material-ui/core";
import GlobalStyles from "../../globalStyles";
import { useForm } from "./useForm";
import {
  deleteAppSolutionsApi,
  getOneAppSolutionsApi,
} from "../../Utils/appSolutionsApi";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditRoundedIcon from "@material-ui/icons/Edit";
import { PhotoCamera } from "@material-ui/icons";
import Toast from "../../components/Toast";
import DataTable from "../Table.js/index";
import { fieldNames } from "../../Utils/formConstants";

const AddAppSolutions = ({ header }) => {
  const {
    rows,
    alertOpen,
    isLoading,
    getAllAppSolutions,
    setAlertOpen,
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
    itemUpdate,
    setItemUpdate,
    addItem,
    updateItem,
    setItemIndex,
  } = useForm();
  const { form, buttonWrap } = GlobalStyles();

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteAppSolutionsApi(id)
      .then((response) => {
        console.log("response", response);
        if (response.status === "success") {
          getAllAppSolutions();

          setResponseMessage({
            status: response.status,
            message: "Item Deleted Successfully",
          });
          setAlertOpen(true);
        } else {
          setResponseMessage({
            status: "error",
            message: response.message,
          });
          setAlertOpen(true);
        }
      })
      .catch((error) => {
        setResponseMessage({
          status: "error",
          message: error.message,
        });
        setAlertOpen(true);
      });
  };

  const deleteItemByIndex = (index) => {
    console.log("values before delete", values);
    let newItems = values.dataArray;
    newItems.splice(index, 1);
    console.log("newObject", newItems);
    setValues((previousState) => {
      previousState.dataArray = newItems;
      return {
        ...previousState,
      };
    });
  };

  const setUpdateItemValues = (valueToUpdate, index) => {
    setItemUpdate(true);
    setItemIndex(index);
    setValues((previousState) => {
      previousState.title = valueToUpdate.title ? valueToUpdate.title : "";
      previousState.description = valueToUpdate.text ? valueToUpdate.text : "";
      return {
        ...previousState,
      };
    });
    setSelectedIcon(valueToUpdate.icon);
  };

  const handleUpdate = async (id) => {
    setUpdate(true);
    console.log("id", id);
    await getOneAppSolutionsApi(id)
      .then((response) => {
        console.log("res", response);
        if (response.status === "success") {
          setValues({
            id: response.data.result._id,
            dataArray: response.data.result.dataArray,
          });
          setSelectedFile(response.data.result.image);
        } else {
          setResponseMessage({
            status: "error",
            message: response.message,
          });
          setAlertOpen(true);
        }
      })
      .catch((error) => {
        setResponseMessage({
          status: "error",
          message: error.message,
        });
        setAlertOpen(true);
      });
  };

  const valueskeys = {
    _id: "_id",
    title: "image",
  };

  return (
    <>
      <Grid container justify="center">
        <Grid container item xs={12}>
          <Grid item xs="12">
            <Typography align="center" variant="h4" gutterBottom>
              {header}
            </Typography>
          </Grid>
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
                  value={values.title}
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
                  value={values.description}
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
                  onClick={itemUpdate ? updateItem : addItem}
                >
                  {itemUpdate ? "Update" : "Add"} Item
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Items Added
                </Typography>
                <List>
                  {values.dataArray &&
                    values.dataArray.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText>{item.title}</ListItemText>
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => deleteItemByIndex(index)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                          <IconButton
                            onClick={() => setUpdateItemValues(item, index)}
                          >
                            <EditRoundedIcon color="primary" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                </List>
              </Grid>
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
            </Grid>
          </form>
        </Grid>
        <Grid item xs={10}>
          <DataTable
            rows={rows}
            loading={isLoading}
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
    </>
  );
};

AddAppSolutions.propTypes = {
  header: PropTypes.string.isRequired,
};

export default AddAppSolutions;
