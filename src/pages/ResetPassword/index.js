import { Grid, Card, TextField, Button, InputLabel } from "@material-ui/core";
import Logo from "../../assets/logo.png";
import { fieldNames } from "../../Utils/formConstants";
import { useForm } from "./useForm";

const ResetPassword = () => {
  const { values, errors, handleInputChange, handleSubmit } = useForm();

  return (
    <Grid
      style={{ height: "100vh" }}
      container
      justify="center"
      alignContent="center"
    >
      <Grid item xs={4}>
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ margin: "30px 20px" }}
            width="200px"
            src={Logo}
            alt="Magnit Logo"
          />

          <form style={{ padding: "20px 20px" }} onSubmit={handleSubmit}>
            <InputLabel id="input-password">Password</InputLabel>
            <TextField
              id="input-password"
              name={fieldNames.password}
              type="password"
              fullWidth
              variant="outlined"
              placeholder="*********"
              value={values.password}
              {...(errors && { error: true, helperText: errors.password })}
              onChange={handleInputChange}
            />
            <InputLabel id="input-confirm-password">
              Confirm Password
            </InputLabel>
            <TextField
              id="input-confirm-password"
              name={fieldNames.confirmPassword}
              type="password"
              fullWidth
              variant="outlined"
              value={values.confirmPassword}
              {...(errors && {
                error: true,
                helperText: errors.confirmPassword,
              })}
              onChange={handleInputChange}
            />

            <Button fullWidth variant="contained" color="primary" type="submit">
              Reset Password
            </Button>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
