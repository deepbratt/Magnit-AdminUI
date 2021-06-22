import PropTypes from "prop-types";
import FullPageDialog from "../../components/FullPageDialog";
import {
  Button,
  Grid,
  InputLabel,
  TextField,
  MenuItem,
} from "@material-ui/core";
import GlobalStyles from "../../globalStyles";
import { useForm } from "./useForm";
import { fieldNames } from "../../Utils/formConstants";
import { useEffect, useState, useCallback } from "react";
import {
  deletePagesApi,
  getAllPagesApi,
  getOnePagesApi,
} from "../../Utils/pagesApi";
import DataTable from "../../components/Table.js";
import Toast from "../../components/Toast";

const sections = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "user",
    label: "User",
  },
];

const AddNewPages = ({ open, handleClose }) => {
  const getAllPages = useCallback(async () => {
    let response = await getAllPagesApi();
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

  const tableHead = [
    { title: "Section Name", align: "left" },
    { title: "Order", align: "left" },
    { title: "Canonical", align: "left" },
  ];

  const [rows, setRows] = useState([]);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  useEffect(() => {
    getAllPages();
  }, [getAllPages]);

  const handleDelete = async (id) => {
    await deletePagesApi(id)
      .then((response) => {
        console.log("response", response);
        if (response.status === "success") {
          getAllPages();
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
    await getOnePagesApi(id)
      .then((response) => {
        if (response.status === "success") {
          setValues({
            firstName: response.data.result.firstName,
            lastName: response.data.result.lastName,
            email: response.data.result.email,
            role: response.data.result.role,
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

  const valueskeys = {
    _id: "section",
    title: "name",
  };

  return (
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
            <InputLabel id="input-canonical">Canonical</InputLabel>
            <TextField
              name={fieldNames.canonical}
              id="input-canonical"
              variant="outlined"
              placeholder="/services"
              value={values.canonical}
              {...(errors && {
                error: true,
                helperText: errors.canonical,
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

          <Grid item xs={12} md={6}>
            <InputLabel id="input-keywords">Keywords</InputLabel>
            <TextField
              name={fieldNames.keywords}
              id="input-keywords"
              variant="outlined"
              placeholder="services, careers, solutions etc"
              value={values.keywords}
              {...(errors && {
                error: true,
                helperText: errors.keywords,
              })}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel id="input-sections">Sections</InputLabel>
            <TextField
              name={fieldNames.sections}
              select
              id="input-sections"
              variant="outlined"
              placeholder=""
              value={values.sections}
              {...(errors && { error: true, helperText: errors.sections })}
              onChange={handleInputChange}
              fullWidth
            >
              {sections.map((section) => (
                <MenuItem key={section.value} value={section.value}>
                  {section.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel id="input-query">Query</InputLabel>
            <TextField
              name={fieldNames.query}
              id="input-query"
              variant="outlined"
              placeholder="query e.g query"
              value={values.query}
              {...(errors && {
                error: true,
                helperText: errors.query,
              })}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel id="input-order">Order</InputLabel>
            <TextField
              type="number"
              name={fieldNames.order}
              id="input-order"
              variant="outlined"
              placeholder="e.g 3"
              value={values.order}
              {...(errors && {
                error: true,
                helperText: errors.order,
              })}
              onChange={handleInputChange}
              fullWidth
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
          tableHead={tableHead}
          rows={rows}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          valueskeys={valueskeys}
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
  );
};

AddNewPages.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddNewPages;
