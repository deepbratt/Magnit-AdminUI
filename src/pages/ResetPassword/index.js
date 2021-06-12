import { Grid, Card, TextField, Button, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import Logo from "../../assets/logo.png";
import GlobalStyles from "../../globalStyles";
import { fieldNames } from "../../Utils/formConstants";
import { useForm } from "./useForm";

const ResetPassword = () => {
  const { token } = useParams();
  const { values, errors, handleInputChange, responseMessage, handleSubmit } =
    useForm(token);
  console.log("token", token);
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
            style={{ margin: "30px 20px" }}
            width="200px"
            src={Logo}
            alt="Magnit Logo"
          />

          <form style={{ padding: "20px 20px" }} onSubmit={handleSubmit}>
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

            <TextField
              id="input-confirm-password"
              name={fieldNames.confirmPassword}
              type="password"
              label="Re-enter your password"
              fullWidth
              variant="outlined"
              value={values.confirmPassword}
              {...(errors && {
                error: true,
                helperText: errors.confirmPassword,
              })}
              onChange={handleInputChange}
            />
            <Button
              style={{ marginBottom: "10px" }}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Reset Password
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

export default ResetPassword;
