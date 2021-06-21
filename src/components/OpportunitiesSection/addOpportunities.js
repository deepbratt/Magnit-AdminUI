import PropTypes from "prop-types";
import FullPageDialog from "../FullPageDialog";
import { Button, Grid, InputLabel, TextField } from "@material-ui/core";
import GlobalStyles from "../../globalStyles";
import { useForm } from "./useForm";
import { fieldNames } from "../../Utils/formConstants";
import ServicesTable from "../Table.js/index";
import { useEffect, useState, useCallback } from "react";
import {
  getAllOpportunitiesApi,
  deleteOpportunitiesApi,
  getOneOpportunitiesApi,
} from "../../Utils/opportunitiesApi";
import Toast from "../../components/Toast";

const AddOpportunities = ({ open, handleClose }) => {
  const getAllOpportunities = useCallback(async () => {
    let response = await getAllOpportunitiesApi();
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
    getAllOpportunities();
  }, [getAllOpportunities]);

  const handleDelete = async (id) => {
    await deleteOpportunitiesApi(id)
      .then((response) => {
        if (response.status === "success") {
          getAllOpportunities();
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
    setId(id);
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

  return (
    <FullPageDialog
      header="Manage Opportunities Section"
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
          <ServicesTable
            rows={rows}
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
    </FullPageDialog>
  );
};

AddOpportunities.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddOpportunities;
