import PropTypes from "prop-types";
import FullPageDialog from "../../components/FullPageDialog";
import Toast from "../../components/Toast";
import {
  Button,
  Grid,
  InputLabel,
  Tooltip,
  TextField,
  Card,
} from "@material-ui/core";
import ColorPicker from "material-ui-color-picker";
import GlobalStyles from "../../globalStyles";
import { IconButton } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { useForm } from "./useForm";
import { fieldNames } from "../../Utils/formConstants";
import ServicesTable from "../../components/Table.js/index";
import { useEffect, useState, useCallback } from "react";
import {
  deleteServiceApi,
  getAllServicesApi,
  getOneServicesApi,
} from "../../Utils/servicesSectionApi";

const AddServices = ({ open, handleClose }) => {
  const getAllServices = useCallback(async () => {
    let response = await getAllServicesApi();
    if (response) {
      setRows(response.data.result);

      setResponseMessage({
        status: response.status,
        message: response.message,
      });
    }
  }, []);

  const [id, setId] = useState(null);
  const {
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
  } = useForm(id);
  const { form, buttonWrap } = GlobalStyles();

  const tableHead = [
    { title: "ID", align: "left" },
    { title: "Title", align: "left" },
    { title: "Delete", align: "right" },
    { title: "Update", align: "right" },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    getAllServices();
  }, [getAllServices]);

  const handleDelete = async (id) => {
    await deleteServiceApi(id)
      .then((response) => {
        console.log("response", response);
        if (response.status === "success") {
          getAllServices();
        }
        if (response.status === "fail") {
          console.log(response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = async (id) => {
    setUpdate(true);
    setId(id);
    await getOneServicesApi(id)
      .then((response) => {
        if (response.status === "success") {
          setValues({
            title: response.data.result.title,
            description: response.data.result.description,
            buttonLabel: response.data.result.buttonLabel,
            buttonLink: response.data.result.buttonLink,
            id: id,
          });
          setColor(response.data.result.color);
          setSelectedFile(response.data.result.image);
        }
        if (response.status === "fail") {
          console.log(response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <FullPageDialog
      header="Manage Services Section"
      open={open}
      handleClose={handleClose}
    >
      <Grid container justify="center">
        <Grid container item xs={12}>
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
                required
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
                {...(errors && { error: true, helperText: errors.buttonLabel })}
                onChange={handleInputChange}
                fullWidth
                required
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
                {...(errors && { error: true, helperText: errors.buttonLink })}
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
                {...(errors && { error: true, helperText: errors.description })}
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
            tableHead={tableHead}
            rows={rows}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        </Grid>
        {responseMessage && (
          <Toast
            severity={responseMessage.status}
            message={responseMessage.message}
          />
        )}
      </Grid>
    </FullPageDialog>
  );
};

AddServices.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddServices;