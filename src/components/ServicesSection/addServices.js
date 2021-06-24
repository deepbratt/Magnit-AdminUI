import { useForm } from "./useForm";
import {
  Button,
  Grid,
  InputLabel,
  Tooltip,
  TextField,
  Card,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import ColorPicker from "material-ui-color-picker";
import ServicesTable from "../../components/Table.js/index";
import GlobalStyles from "../../globalStyles";
import { fieldNames } from "../../Utils/formConstants";

import Toast from "../../components/Toast";

const AddServices = ({ getOneServicesApi, deleteServiceApi, header }) => {
  const {
    rows,
    alertOpen,
    isLoading,
    getAllServices,
    setAlertOpen,
    color,
    setColor,
    values,
    setValues,
    errors,
    update,
    setUpdate,
    handleInputChange,
    selectedFile,
    setSelectedFile,
    handleCapture,
    handleSubmit,
    resetForm,
    responseMessage,
    setResponseMessage,
  } = useForm();
  const { form, buttonWrap } = GlobalStyles();

  const types = [
    {
      value: "Parent",
      label: "parent",
    },
    {
      value: "Child",
      label: "child",
    },
  ];

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteServiceApi(id)
      .then((response) => {
        if (response.status === "success") {
          getAllServices();
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

  const handleUpdate = async (id) => {
    setUpdate(true);
    await getOneServicesApi(id)
      .then((response) => {
        if (response.status === "success") {
          setValues({
            title: response.data.result.title,
            description: response.data.result.description,
            buttonLabel: response.data.result.buttonLabel,
            buttonLink: response.data.result.buttonLink,
            type: response.data.result.type,
            id: response.data.result._id,
          });
          setColor(response.data.result.color);
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
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <InputLabel id="input-button-label">Button Label</InputLabel>
              <TextField
                name={fieldNames.buttonLabel}
                id="input-button-label"
                variant="outlined"
                placeholder="e.g Learn More"
                value={values.buttonLabel}
                {...(errors && {
                  error: true,
                  helperText: errors.buttonLabel,
                })}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel id="input-button-link">Button Link</InputLabel>
              <TextField
                name={fieldNames.buttonLink}
                id="input-button-link"
                variant="outlined"
                placeholder="/services/web-development"
                value={values.buttonLink}
                {...(errors && {
                  error: true,
                  helperText: errors.buttonLink,
                })}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel id="input-description">Discription</InputLabel>
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
              <label>{selectedFile ? selectedFile.name : "Select Image"}</label>
              <Card
                style={{
                  backgroundColor: color,
                  padding: "20px",
                  margin: "0 50px",
                  minHeight: "120px",
                  maxHeight: "120px",
                  minWidth: "100px",
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

              <ColorPicker
                variant="outlined"
                label="Pick a Color"
                name={fieldNames.color}
                value={color}
                onChange={(color) => setColor(color.toString())}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel id="input-type">Type</InputLabel>
              <TextField
                name={fieldNames.type}
                select
                id="input-type"
                variant="outlined"
                placeholder="Web Development Services"
                value={values.services}
                {...(errors && {
                  error: true,
                  helperText: errors.services,
                })}
                onChange={handleInputChange}
                fullWidth
              >
                {types.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </TextField>
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
          <ServicesTable
            rows={rows}
            loading={isLoading}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
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

AddServices.propTypes = {};

export default AddServices;
