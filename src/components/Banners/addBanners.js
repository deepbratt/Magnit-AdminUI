import PropTypes from "prop-types";
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
import Toast from "../../components/Toast";
import ServicesTable from "../../components/Table.js/index";
import GlobalStyles from "../../globalStyles";
import { fieldNames } from "../../Utils/formConstants";
import { deleteBannerApi, getOneBannerApi } from "../../Utils/bannersApi";

const types = [
  {
    value: "center",
    label: "Center",
  },
  {
    value: "right",
    label: "Right",
  },
];

const AddBanners = ({ header }) => {
  const {
    rows,

    getAllBanners,
    isLoading,
    alertOpen,
    setAlertOpen,
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

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteBannerApi(id)
      .then((response) => {
        console.log("response", response);
        if (response.status === "success") {
          getAllBanners();
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

  const handleUpdate = async (id) => {
    setUpdate(true);

    await getOneBannerApi(id)
      .then((response) => {
        if (response.status === "success") {
          setValues({
            heading: response.data.result.heading,
            subHeading: response.data.result.subHeading,
            buttonLabel: response.data.result.buttonLabel,
            buttonLink: response.data.result.buttonLink,
            type: response.data.result.type,
            id: id,
          });

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
    title: "heading",
  };

  return (
    <>
      <Grid container justify="center">
        <Grid container item xs={12}>
          <Typography align="center" variant="h4" gutterBottom>
            {header}
          </Typography>
          <form className={form} onSubmit={handleSubmit}>
            <Grid item xs={12} md={6}>
              <InputLabel id="input-heading">Heading</InputLabel>
              <TextField
                name={fieldNames.heading}
                id="input-heading"
                variant="outlined"
                placeholder="e.g Web Development"
                value={values.heading}
                {...(errors && { error: true, helperText: errors.heading })}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel id="input-subHeading">Sub Heading</InputLabel>
              <TextField
                name={fieldNames.subHeading}
                id="input-subHeading"
                variant="outlined"
                placeholder="lorem ipsum...."
                value={values.subHeading}
                {...(errors && { error: true, helperText: errors.subHeading })}
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
                {...(errors && { error: true, helperText: errors.buttonLabel })}
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
                {...(errors && { error: true, helperText: errors.buttonLink })}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel id="input-type">Type</InputLabel>
              <TextField
                name={fieldNames.type}
                select
                id="input-type"
                variant="outlined"
                placeholder="/services/web-development"
                value={values.type}
                {...(errors && { error: true, helperText: errors.type })}
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
              <input
                accept="image/*"
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
                  backgroundColor: "#eee",
                  padding: "20px",
                  margin: "0 50px",
                  minHeight: "120px",
                  maxHeight: "120px",
                  minWidth: "120px",
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

AddBanners.propTypes = {
  header: PropTypes.string.isRequired,
};

export default AddBanners;
