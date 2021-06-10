import PropTypes from "prop-types";
import FullPageDialog from "../../components/FullPageDialog";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    minWidth: "100%",
    padding: "20px",
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      padding: "10px",
    },
  },
  multipleInput: {
    minWidth: "100%",
  },
  buttonWrap: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
}));

const roles = ["Admin", "SE0 Professional", "Developer"];

const AddNewUser = ({ open, handleClose }) => {
  const classes = useStyles();

  return (
    <FullPageDialog open={open} handleClose={handleClose}>
      <Grid container>
        <Grid className={classes.formRoot} container item xs={12}>
          <form className={classes.form}>
            <Grid item xs={12} md={6}>
              <InputLabel id="input-title">Email</InputLabel>
              <TextField
                type="email"
                labelId="input-email"
                id="input-title"
                variant="outlined"
                placeholder="e.g johnmartin@abc.com"
                size="medium"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel id="input-password">Password</InputLabel>
              <TextField
                type="password"
                labelId="input-password"
                id="input-password"
                variant="outlined"
                placeholder="Enter your Password"
                size="medium"
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel id="input-user-role">Role</InputLabel>
              <TextField
                labelId="input-user-role"
                id="input-user-role"
                select
                fullWidth
                variant="outlined"
              >
                {roles.map((option) => (
                  <MenuItem key={`option-${option}`} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid className={classes.buttonWrap} item xs={12} md={6}>
              <Button
                style={{ maxWidth: "100px" }}
                variant="contained"
                color="secondary"
                size="large"
              >
                Delete
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </FullPageDialog>
  );
};

AddNewUser.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddNewUser;