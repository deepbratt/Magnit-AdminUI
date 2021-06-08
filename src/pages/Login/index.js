import { Grid, Typography } from "@material-ui/core";

const Login = () => {
  return (
    <Grid
      style={{ height: "100vh" }}
      container
      justify="center"
      alignContent="center"
    >
      <Grid item xs={10}>
        <Typography align="center">Login to continue</Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
