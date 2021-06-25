import PropTypes from "prop-types";
import { useForm } from "./useForm";
import {
  Button,
  Grid,
  InputLabel,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import Toast from "../../components/Toast";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import DataTable from "../Table.js/index";
import GlobalStyles from "../../globalStyles";
import { fieldNames } from "../../Utils/formConstants";
import {
  deleteTrainingAndCertificationsApi,
  getOneTrainingAndCertificationsApi,
} from "../../Utils/trainingAndCertificationApi";

const AddTrainingAndCertification = ({ header }) => {
  const {
    rows,
    isLoading,
    getAllTrainingAndCertification,
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
    selectedFile,
    setSelectedFile,
    handleCapture,
    responseMessage,
    setResponseMessage,
  } = useForm();
  const { form, buttonWrap } = GlobalStyles();

  const handleDelete = async (id) => {
    await deleteTrainingAndCertificationsApi(id)
      .then((response) => {
        console.log("response", response);
        if (response.status === "success") {
          getAllTrainingAndCertification();
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

    await getOneTrainingAndCertificationsApi(id)
      .then((response) => {
        if (response.status === "success") {
          setValues({
            title: response.data.result.title,
            description: response.data.result.description,
            id: id,
          });
          setSelectedFile(response.data.result.jsonFile);
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

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
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
                accept=".json"
                name={fieldNames.jsonText}
                style={{ display: "none" }}
                id="input-json-file"
                type="file"
                onChange={handleCapture}
              />
              <Tooltip title="Select Json File">
                <label htmlFor="input-json-file">
                  <IconButton
                    color="primary"
                    aria-label="upload json file"
                    component="span"
                  >
                    <InsertDriveFileIcon fontSize="large" />
                  </IconButton>
                </label>
              </Tooltip>
              <label>
                {selectedFile ? selectedFile.name : "Select Json File"}
              </label>
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
        {responseMessage && (
          <Toast
            open={alertOpen}
            onClose={handleAlertClose}
            severity={responseMessage.status}
            message={responseMessage.message}
          />
        )}
      </Grid>
    </>
  );
};

AddTrainingAndCertification.propTypes = {
  header: PropTypes.string.isRequired,
};

export default AddTrainingAndCertification;
