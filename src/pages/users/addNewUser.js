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
  deleteUsersApi,
  getAllUsersApi,
  getOneUsersApi,
} from "../../Utils/usersApi";
import DataTable from "../../components/Table.js";
import Toast from "../../components/Toast";

const roles = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "user",
    label: "User",
  },
];

const AddUsers = ({ open, handleClose }) => {
  const getAllUsers = useCallback(async () => {
    let response = await getAllUsersApi();
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
    { title: "First Name", align: "left" },
    { title: "Email", align: "left" },
    { title: "Role", align: "left" },
  ];

  const [rows, setRows] = useState([]);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleDelete = async (id) => {
    await deleteUsersApi(id)
      .then((response) => {
        console.log("response", response);
        if (response.status === "success") {
          getAllUsers();
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
    await getOneUsersApi(id)
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
    _id: "firstName",
    title: "email",
    roles: "roles",
  };

  return (
    <Grid container justify="center">
      <Grid container item xs={12}>
        <form className={form} onSubmit={handleSubmit}>
          <Grid item xs={12} md={6}>
            <InputLabel id="input-firstName">First Name</InputLabel>
            <TextField
              name={fieldNames.firstName}
              id="input-firstName"
              variant="outlined"
              placeholder="e.g John"
              value={values.firstName}
              {...(errors && { error: true, helperText: errors.firstName })}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel id="input-lastName">Last Name</InputLabel>
            <TextField
              name={fieldNames.lastName}
              id="input-lastName"
              variant="outlined"
              placeholder="e.g Martin"
              value={values.lastName}
              {...(errors && { error: true, helperText: errors.lastName })}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel id="input-email">Email</InputLabel>
            <TextField
              type="email"
              name={fieldNames.email}
              id="input-email"
              variant="outlined"
              placeholder="e.g John@abc.com"
              value={values.email}
              {...(errors && { error: true, helperText: errors.email })}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel id="input-password">Password</InputLabel>
            <TextField
              type="password"
              name={fieldNames.password}
              id="input-password"
              variant="outlined"
              placeholder="********"
              value={values.password}
              {...(errors && { error: true, helperText: errors.password })}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel id="input-confirm-Password">
              Confirm Password
            </InputLabel>
            <TextField
              type="password"
              name={fieldNames.confirmPassword}
              id="input-confirm-Password"
              variant="outlined"
              placeholder="********"
              value={values.confirmPassword}
              {...(errors && {
                error: true,
                helperText: errors.confirmPassword,
              })}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel id="input-role">Role</InputLabel>
            <TextField
              name={fieldNames.role}
              select
              id="input-role"
              variant="outlined"
              placeholder=""
              value={values.role}
              {...(errors && { error: true, helperText: errors.role })}
              onChange={handleInputChange}
              fullWidth
            >
              {roles.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </TextField>
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

AddUsers.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddUsers;
