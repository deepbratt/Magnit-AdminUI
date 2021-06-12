import { Grid, Card, TextField, Button, Typography } from "@material-ui/core";
import Logo from "../../assets/logo.png";
import GlobalStyles from "../../globalStyles";
import { fieldNames } from "../../Utils/formConstants";
import { useForm } from "./useForm";

const ForgetPassword = () => {
  const {
    values,
    errors,
    handleInputChange,
    handleSubmit,
    responseMessage,
    resetLinkMessage,
  } = useForm();
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
          {resetLinkMessage ? (
            <Typography align="center" color="info" variant="h5">
              {resetLinkMessage}
            </Typography>
          ) : (
            <>
              <Typography variant="h6" gutterBottom>
                Account Recovery
              </Typography>
              <Typography align="center" variant="subtitle1">
                Enter your Magnit Account Email to reset your password.
              </Typography>
              <form style={{ padding: "20px 20px" }} onSubmit={handleSubmit}>
                <TextField
                  id="input-name"
                  name={fieldNames.email}
                  fullWidth
                  variant="outlined"
                  label="Enter your Email"
                  value={values.email}
                  {...(errors && { error: true, helperText: errors.email })}
                  onChange={handleInputChange}
                />

                <Button
                  style={{ marginBottom: "10px" }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Continue
                </Button>
                {responseMessage && (
                  <Typography color="error" variant="subtitle1">
                    {responseMessage}
                  </Typography>
                )}
              </form>
            </>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default ForgetPassword;
