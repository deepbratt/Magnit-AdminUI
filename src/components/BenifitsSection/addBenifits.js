import PropTypes from "prop-types";
import { useForm } from "./useForm";
import {
  Button,
  Grid,
  InputLabel,
  Tooltip,
  TextField,
  Card,
  Typography,
} from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import Toast from "../Toast";
import GlobalStyles from "../../globalStyles";
import BenifitsTable from "../Table.js/index";
import { fieldNames } from "../../Utils/formConstants";
import {
  deleteServiceApi,
  getOneBenifitsApi,
} from "../../Utils/benifitsSectionApi";

const AddBenifts = ({ header }) => {
  const {
    rows,
    getAllBenifits,
    alertOpen,
    setAlertOpen,
    isLoading,
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
    await deleteServiceApi(id)
      .then((response) => {
        if (response.status === "success") {
          getAllBenifits();

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

    await getOneBenifitsApi(id)
      .then((response) => {
        if (response.status === "success") {
          setValues({
            title: response.data.result.title,
            description: response.data.result.description,
            type: response.data.result.type ? response.data.result.type : "",
            id: id,
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

  return (
    <>
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

              <Grid item xs={12} md={6}>
                <InputLabel id="input-type">Type</InputLabel>
                <TextField
                  name={fieldNames.type}
                  id="input-type"
                  variant="outlined"
                  placeholder="Web Development Services"
                  value={values.type}
                  {...(errors && {
                    error: true,
                    helperText: errors.type,
                  })}
                  onChange={handleInputChange}
                  fullWidth
                />
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
                <label>
                  {selectedFile ? selectedFile.name : "Select Image"}
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
            <BenifitsTable
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
    </>
  );
};

AddBenifts.propTypes = {
  header: PropTypes.string.isRequired,
};

export default AddBenifts;
