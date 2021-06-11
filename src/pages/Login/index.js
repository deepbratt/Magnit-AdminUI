import { Grid, Card, TextField, Button } from "@material-ui/core";
import Logo from "../../assets/logo.png";
import { fieldNames } from "../../Utils/formConstants";
import { useForm } from "./useForm";

const Login = () => {
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
            <TextField
              id="input-name"
              name={fieldNames.email}
              fullWidth
              variant="outlined"
              placeholder="e.g John@gmail.com"
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
              placeholder="*********"
              value={values.password}
              {...(errors && { error: true, helperText: errors.password })}
              onChange={handleInputChange}
            />

            <Button fullWidth variant="contained" color="primary" type="submit">
              Login
            </Button>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
