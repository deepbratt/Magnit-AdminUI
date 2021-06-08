import { Grid, InputLabel, Typography, Button, FormControlLabel, Radio } from "@material-ui/core";
import React, { useState } from "react";
import InputStyle from "../../Component/Input/index";
import { fieldName, labelsText } from "../../Utils/form";
import FormStyle from "./style";
import { useForm } from "./useForm";
export const Login = () => {
  const { root, div, logo, label, form, forget,radio } = FormStyle();
  const [Forgetpass, setForgetpass] = useState(false);
  const { values, errors, handleInputChange,handleRememberMeChange, handleSubmit } = useForm(true);

  return (
    <Grid container justify="center" className={div}>
      <Grid item xs={10} md={5} lg={4} className={root}>
        <div className={logo}>
          <Typography variant="h4" color="initial">
            {" "}
            Logo
          </Typography>
        </div>
        {Forgetpass ? (
          <form className={form} onSubmit={handleSubmit}>
            <Typography
              variant="h4"
              style={{ padding: "1rem", textAlign: "center" }}
            >
              Reset Password{" "}
            </Typography>
            <InputLabel className={label} htmlFor="input-email">
              {labelsText.email}
            </InputLabel>

            <InputStyle
              id="input-email"
              fullWidth
              placeholder="e.g abc@gmail.com"
              name={fieldName.email}
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <InputLabel className={label} htmlFor="input-name">
              {labelsText.newPassword}
            </InputLabel>
            <InputStyle
              id="input-password"
              fullWidth
              placeholder=""
              name={fieldName.newPassword}
              value={values.newPassword}
              onChange={handleInputChange}
              error={errors.newPassword}
            />
            <InputLabel className={label} htmlFor="input-name">
              {labelsText.confirmPassword}
            </InputLabel>
            <InputStyle
              id="input-password"
              fullWidth
              placeholder=""
              name={fieldName.confirmPassword}
              value={values.confirmPassword}
              error={errors.confirmPassword}
              onChange={handleInputChange}
            />
            <Button type="submit" color="primary" variant="contained" fullWidth>
              <Typography
                style={{ textAlign: "center", color: "#fff" }}
                variant="button"
                onClick={() => setForgetpass(false)}
              >
                {labelsText.submit}
              </Typography>
            </Button>
          </form>
        ) : (
          <form className={form} onSubmit={handleSubmit}>
            <InputLabel className={label} htmlFor="input-email">
              {labelsText.email}
            </InputLabel>

            <InputStyle
              id="input-email"
              fullWidth
              placeholder="e.g abc@gmail.com"
              name={fieldName.email}
              values={values.email}
              error={errors.email}
              onChange={handleInputChange}
            />
            <InputLabel className={label} htmlFor="input-name">
              {labelsText.password}
            </InputLabel>
            <InputStyle
              id="input-password"
              fullWidth
              placeholder=""
              name={fieldName.password}
              value={values.password}
              error={errors.password}
              onChange={handleInputChange}
            />
<FormControlLabel className={radio} value="end" control={<Radio color="primary" name={fieldName.rememberMe}
              value={values.rememberMe} onChange={handleRememberMeChange}/>} label={labelsText.rememberMe}  />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="small"
              fullWidth
            >
              <Typography
                style={{ textAlign: "center", color: "#fff" }}
                variant="button"
              >
                {labelsText.signin}
              </Typography>
            </Button>
            <Typography className={forget} onClick={() => setForgetpass(true)}>
              Forgot Password?
            </Typography>
          </form>
        )}
      </Grid>
    </Grid>
  );
};
