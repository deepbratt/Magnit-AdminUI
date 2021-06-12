import { Typography } from "@material-ui/core";
import { Grid, Card, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router";
import Logo from "../../assets/logo.png";
import GlobalStyles from "../../globalStyles";
import { fieldNames } from "../../Utils/formConstants";
import { useForm } from "./useForm";

const Login = () => {
  const {
    values,
    errors,
    handleInputChange,
    responseMessage,
    handleSubmit,
  } = useForm();
  const history = useHistory();

  const { loginFormGrid, formCard } = GlobalStyles();
  return (
    <Grid
      className={loginFormGrid}
      container
      justify="center"
      alignContent="center"
    >
      <Grid item xs={4}>
        <Card className={formCard}>
          <img
            style={{ margin: "20px 0" }}
            width="120px"
            src={Logo}
            alt="Magnit Logo"
          />
          <Typography variant="h6" gutterBottom>
            Sign In
          </Typography>
          <Typography align="center" variant="subtitle1">
            Enter your Magnit Account Email and password.
          </Typography>
          <form style={{ padding: "20px 20px" }} onSubmit={handleSubmit}>
            <TextField
              id="input-name"
              name={fieldNames.email}
              fullWidth
              variant="outlined"
              label="Email"
              value={values.email}
              {...(errors && { error: true, helperText: errors.email })}
              onChange={handleInputChange}
            />
            <TextField
              id="input-password"
              name={fieldNames.password}
              type="password"
              fullWidth
              variant="outlined"
              label="Enter your password"
              value={values.password}
              {...(errors && { error: true, helperText: errors.password })}
              onChange={handleInputChange}
            />
            <Button
              style={{ marginBottom: "10px" }}
              onClick={() => history.push("/forgot-password")}
            >
              Forgot Password?
            </Button>

            <Button
              style={{ marginBottom: "10px" }}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
            {responseMessage && (
              <Typography color="error" variant="subtitle1">
                {responseMessage}
              </Typography>
            )}
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
