import PropTypes from "prop-types";
import FullPageDialog from "../FullPageDialog";
import {
  Button,
  Grid,
  InputLabel,
  Tooltip,
  TextField,
  Card,
} from "@material-ui/core";
import GlobalStyles from "../../globalStyles";
import { IconButton } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { useForm } from "./useForm";
import { fieldNames } from "../../Utils/formConstants";
import BenifitsTable from "../Table.js/index";
import { useEffect, useState, useCallback } from "react";
import {
  deleteServiceApi,
  getAllBenifitsApi,
  getOneBenifitsApi,
} from "../../Utils/benifitsSectionApi";
import Toast from "../Toast";

const AddBenifts = ({ open, handleClose }) => {
  const getAllBenifits = useCallback(async () => {
    let response = await getAllBenifitsApi();
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
    selectedFile,
    setSelectedFile,
    handleCapture,
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
    getAllBenifits();
  }, [getAllBenifits]);

  const handleDelete = async (id) => {
    await deleteServiceApi(id)
      .then((response) => {
        if (response.status === "success") {
          getAllBenifits();
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
    await getOneBenifitsApi(id)
      .then((response) => {
        if (response.status === "success") {
          setValues({
            title: response.data.result.title,
            description: response.data.result.description,
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

  return (
    <>
      <FullPageDialog
        header="Manage Benifits Section"
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
    </>
  );
};

AddBenifts.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddBenifts;
