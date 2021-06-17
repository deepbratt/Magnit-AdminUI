import PropTypes from "prop-types";
import FullPageDialog from "../../components/FullPageDialog";
import {
  Button,
  Grid,
  InputLabel,
  TextField,
  ListItemSecondaryAction,
} from "@material-ui/core";
import GlobalStyles from "../../globalStyles";
import { useForm } from "./useForm";
import { fieldNames } from "../../Utils/formConstants";
import ServicesTable from "../../components/Table.js/index";
import { useEffect, useState, useCallback } from "react";
import {
  deleteHiringOptionsApi,
  getAllHiringOptionsApi,
  getOneHiringOptionsApi,
} from "../../Utils/hiringOptionsApi";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const AddHiringOptions = ({ open, handleClose }) => {
  const getAllServices = useCallback(async () => {
    let response = await getAllHiringOptionsApi();
    if (response) {
      setRows(response.data.result);
    }
  }, []);

  const [id, setId] = useState(null);
  const {
    item,
    setItem,
    items,
    setItems,
    values,
    setValues,
    errors,
    update,
    setUpdate,
    handleInputChange,
    handleSubmit,
    resetForm,
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
    await deleteHiringOptionsApi(id)
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

  const deleteItemByIndex = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);

    setItems(newItems);
  };

  const handleUpdate = async (id) => {
    setUpdate(true);
    setId(id);
    await getOneHiringOptionsApi(id)
      .then((response) => {
        console.log("res", response);
        if (response.status === "success") {
          setValues({
            heading: response.data.result.heading,
            text: response.data.result.text,
            buttonLabel: response.data.result.buttonLabel,
            buttonLink: response.data.result.buttonLink,
            id: id,
          });
          setItems(response.data.result.items);
        }
        if (response.status === "fail") {
          console.log(response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const valueskeys = {
    title: "heading",
  };

  return (
    <FullPageDialog
      header="Manage Hiring Options Section"
      open={open}
      handleClose={handleClose}
    >
      <Grid container justify="center">
        <Grid container item xs={12}>
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

            <Grid item xs={12} md={6}>
              <InputLabel id="input-items">Items</InputLabel>
              <TextField
                name={fieldNames.items}
                id="input-items"
                variant="outlined"
                placeholder="lorem ipsum...."
                value={item}
                {...(errors && { error: true, helperText: errors.text })}
                onChange={(e) => setItem(e.target.value)}
                fullWidth
                multiline
              />
              <Button
                style={{
                  minWidth: "120px",
                  maxHeight: "50px",
                }}
                variant="outlined"
                color="success"
                size="large"
                onClick={() => {
                  setItems([...items, item]);
                }}
              >
                Add Items
              </Button>
              <List>
                {items &&
                  items.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText>{item}</ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton
                          color="warning"
                          onClick={() => deleteItemByIndex(index)}
                        >
                          <DeleteIcon />
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
          <ServicesTable
            tableHead={tableHead}
            rows={rows}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            valueskeys={valueskeys}
          />
        </Grid>
      </Grid>
    </FullPageDialog>
  );
};

AddHiringOptions.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddHiringOptions;
