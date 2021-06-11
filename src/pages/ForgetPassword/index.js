import { Grid, Card, TextField, Button } from "@material-ui/core";
import Logo from "../../assets/logo.png";
import { fieldNames } from "../../Utils/formConstants";
import { useForm } from "./useForm";

const ForgetPassword = () => {
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

            <Button fullWidth variant="contained" color="primary" type="submit">
              Continue
            </Button>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ForgetPassword;
