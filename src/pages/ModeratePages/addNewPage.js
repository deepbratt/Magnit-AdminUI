import PropTypes from "prop-types";
import FullPageDialog from "../../components/FullPageDialog";
import {
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import GlobalStyles from "../../globalStyles";
import { useForm } from "./useForm";
import { fieldNames } from "../../Utils/formConstants";
import { useEffect, useState, useCallback } from "react";
import {
  deletePagesApi,
  getAllPagesApi,
  getOnePagesApi,
} from "../../Utils/pagesApi";
import PagesTable from "../../components/Table.js/PagesTable";
import Toast from "../../components/Toast";

const sections = [
  {
    value: "services",
    label: "Services",
  },
  {
    value: "homeSlider",
    label: "Home Page Slider",
  },
  {
    value: "banner",
    label: "Banner",
  },
  {
    value: "awards",
    label: "Awards",
  },
  {
    value: "reviews",
    label: "Reviews",
  },
  {
    value: "howitWorks",
    label: "How It Works",
  },
  {
    value: "benefits",
    label: "Benifits",
  },
  {
    value: "ourObjectives",
    label: "Our Objective",
  },

];

const AddNewPages = ({ open, handleClose }) => {
  const getAllPages = useCallback(async () => {
    let response = await getAllPagesApi();
    if (response.status === "success") {
      setRows(response.data.result);
      console.log("response", response.data.result);
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
    addSection,
    sectionKeys,
    setSectionKeys,
  } = useForm(id);
  const { form, buttonWrap } = GlobalStyles();

  const tableHead = [
    { title: "Page Name", align: "left" },
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
          console.log("response", response);
          setValues({
            title: response.data.result.metaData.title,
            description: response.data.result.metaData.subtitle,
            canonical: response.data.result.metaData.canonical,
            keywords: response.data.result.metaData.keywords,
            sections: response.data.result.sections,
            id: response.data.result._id,
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
    _id: "_id",
    title: "name",
  };

  const deleteItemByName = (name) => {
    let newObject = values;
    delete newObject.sections[name];
    console.log("new Object", newObject);
    setValues(newObject);
    setSectionKeys(Object.keys(values.sections));
  };

  return (
    <Grid container justify="center">
      <Grid container item xs={12}>
        <form className={form} onSubmit={handleSubmit}>
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Meta Data</Typography>
            </Grid>
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
          </Grid>
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Section</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel id="input-sections">Sections</InputLabel>
              <TextField
                name={fieldNames.sectionName}
                select
                id="input-sections"
                variant="outlined"
                placeholder=""
                value={values.sectionName}
                {...(errors && { error: true, helperText: errors.sectionName })}
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
                required
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
                style={{
                  margin: "0 10px",
                  minWidth: "120px",
                  maxHeight: "50px",
                }}
                variant="contained"
                color="primary"
                size="large"
                onClick={addSection}
              >
                Add Section
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Sections Added
              </Typography>
              <List>
                {sectionKeys &&
                  sectionKeys.map((sectionName, index) => (
                    <ListItem key={index}>
                      <ListItemText>{sectionName.toUpperCase()}</ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton
                          onClick={() => deleteItemByName(sectionName)}
                        >
                          <DeleteIcon color="error" />
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
        <PagesTable
          rows={rows}
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
  );
};

AddNewPages.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddNewPages;
