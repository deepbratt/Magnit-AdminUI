import PropTypes from "prop-types";
import { useForm } from "./useForm";
import {
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import Toast from "../../components/Toast";
import DataTable from "../Table.js/index";
import GlobalStyles from "../../globalStyles";
import { fieldNames } from "../../Utils/formConstants";
import {
  deleteOpportunitiesApi,
  getOneOpportunitiesApi,
} from "../../Utils/opportunitiesApi";

const AddOpportunities = ({ header }) => {
  const {
    rows,
    getAllOpportunities,
    isLoading,
    alertOpen,
    setAlertOpen,
    values,
    setValues,
    errors,
    update,
    setUpdate,
    handleInputChange,
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
    await deleteOpportunitiesApi(id)
      .then((response) => {
        if (response.status === "success") {
          getAllOpportunities();
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

    await getOneOpportunitiesApi(id)
      .then((response) => {
        console.log("resp", response);
        if (response.status === "success") {
          setValues({
            title: response.data.result.title,
            buttonLabel: response.data.result.buttonLabel,
            description: response.data.result.description,
            buttonLink: response.data.result.link,
            location: response.data.result.location,
            id: id,
          });
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
              <InputLabel id="input-location">Location</InputLabel>
              <TextField
                name={fieldNames.location}
                id="input-location"
                variant="outlined"
                placeholder="Karachi, Pakistan"
                value={values.location}
                {...(errors && { error: true, helperText: errors.location })}
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

AddOpportunities.propTypes = {
  header: PropTypes.string.isRequired,
};

export default AddOpportunities;
