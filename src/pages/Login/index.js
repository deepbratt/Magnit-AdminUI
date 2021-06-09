import { Grid, Card, TextField, Button } from "@material-ui/core";
import { useState } from "react";
import Logo from "../../assets/logo.png";
import InputField from "../../components/InputField";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };
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
            <InputField
              id="input-name"
              fullWidth
              placeholder="e.g John@gmail.com"
              value={values.email}
            />
            <InputField
              id="input-password"
              type="password"
              fullWidth
              placeholder="*********"
              value={values.pass}
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
