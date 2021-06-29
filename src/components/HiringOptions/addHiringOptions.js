import PropTypes from "prop-types";
import { useForm } from "./useForm";
import {
  Button,
  Grid,
  Typography,
  InputLabel,
  TextField,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { fieldNames } from "../../Utils/formConstants";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/Edit";
import Toast from "../../components/Toast";
import DataTable from "../../components/Table.js/index";
import DeleteIcon from "@material-ui/icons/Delete";
import GlobalStyles from "../../globalStyles";
import {
  getOneHiringOptionsApi,
  deleteHiringOptionsApi,
} from "../../Utils/hiringOptionsApi";

const AddHiringOptions = ({ header }) => {
  const {
    rows,
    getAllHiringOptions,
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
    itemUpdate,
    setItemUpdate,
    addItem,
    updateItem,
    setItemIndex,
  } = useForm();
  const { form, buttonWrap } = GlobalStyles();

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteHiringOptionsApi(id)
      .then((response) => {
        console.log("response", response);
        if (response.status === "success") {
          getAllHiringOptions();

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

  const deleteItemByIndex = (index) => {
    const newItems = [...values.items];
    newItems.splice(index, 1);

    setValues((previousState) => {
      previousState.items = newItems;

      return {
        ...previousState,
      };
    });
  };

  const setUpdateItemValues = (valueToUpdate, index) => {
    setItemUpdate(true);
    setItemIndex(index);
    setValues((previousState) => {
      previousState.item = valueToUpdate;
      return {
        ...previousState,
      };
    });
  };

  const handleUpdate = async (id) => {
    setUpdate(true);

    await getOneHiringOptionsApi(id)
      .then((response) => {
        console.log("res", response);
        if (response.status === "success") {
          setValues({
            heading: response.data.result.heading,
            text: response.data.result.text,
            buttonLabel: response.data.result.buttonLabel,
            buttonLink: response.data.result.buttonLink,
            items: response.data.result.items,
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
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel id="input-text">Text</InputLabel>
              <TextField
                name={fieldNames.text}
                id="input-text"
                variant="outlined"
                placeholder="lorem ipsum...."
                value={values.text}
                {...(errors && { error: true, helperText: errors.text })}
                onChange={handleInputChange}
                fullWidth
                multiline
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

            <Grid
              item
              container
              justify="space-between"
              alignItems="center"
              xs={12}
            >
              <Grid item xs={9}>
                <InputLabel id="input-items">Items</InputLabel>
                <TextField
                  name={fieldNames.item}
                  id="input-items"
                  variant="outlined"
                  placeholder="lorem ipsum...."
                  value={values.item}
                  {...(errors && { error: true, helperText: errors.items })}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  style={{
                    minWidth: "120px",
                    maxHeight: "50px",
                  }}
                  variant="outlined"
                  color="success"
                  size="large"
                  onClick={itemUpdate ? updateItem : addItem}
                >
                  {itemUpdate ? "Update" : "Add"} Item
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">ITEMS LIST</Typography>
              <List>
                {values.items &&
                  values.items.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText>{item}</ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => deleteItemByIndex(index)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                        <IconButton
                          onClick={() => setUpdateItemValues(item, index)}
                        >
                          <EditRoundedIcon color="primary" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
              </List>
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

AddHiringOptions.propTypes = {
  header: PropTypes.string.isRequired,
};

export default AddHiringOptions;
