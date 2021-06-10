import {
    Grid,
    InputLabel,
    Typography,
    Button,
    FormHelperText,
  } from "@material-ui/core";
  import React from "react";
  import { fieldName, labelsText } from "../../Utils/form";
  import FormStyle from "./style";
  import { useForm } from "./useForm";
  import Visibility from "@material-ui/icons/Visibility";
  import VisibilityOff from "@material-ui/icons/VisibilityOff";
  import PasswordField from "../../Component/Input/password";
const ForgetPs = () => {
  
  
    const { root, div, logo, label, form, } = FormStyle();
   
    const { toggleShow,handleSubmit,values,handleInputChange,errors,} = useForm(true);
  
    return (
      <Grid container justify="center" className={div}>
        <Grid item xs={10} md={5} lg={4} className={root}>
          <div className={logo}>
            <Typography variant="h4" color="initial">
              {" "}
              Logo
            </Typography>
          </div>
         
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
  
              <PasswordField
              id="input-email"
              fullWidth
              placeholder="e.g abc@gmail.com"
              name={fieldName.email}
              type="email"
              value={values.email}
              onChange={handleInputChange}
              error={errors}
              aria-describedby="component-error-text"
        />
          <FormHelperText id="component-error-text" style ={{color :"red"}}>{errors === true ? "Invalid Login" : ""}</FormHelperText>
      
              <InputLabel className={label} htmlFor="input-name">
                {labelsText.newPassword}
              </InputLabel>
              <PasswordField
              id="outlined-adornment-password"
              type={values.hiddenPassword === true ? "text" : "password"}
              name={fieldName.newPassword}
              value={values.newPassword}
              onChange={handleInputChange}
              position="end"
             error={errors}
              onClick={toggleShow}
              showPassword={
                values.hiddenPassword ? <Visibility /> : <VisibilityOff />
              }
              aria-describedby="component-error-text"
        />
          <FormHelperText id="component-error-text" style ={{color :"red"}}>{errors === true ? "Invalid Login" : ""}</FormHelperText>
      
              <InputLabel className={label} htmlFor="input-name">
                {labelsText.confirmPassword}
              </InputLabel>
              <PasswordField
              id="outlined-adornment-password"
              type={values.hiddenPassword === true ? "text" : "password"}
              name={fieldName.confirmPassword}
              value={values.confirmPassword}
              onChange={handleInputChange}
              position="end"
             error={errors}
              onClick={toggleShow}
              showPassword={
                values.hiddenPassword ? <Visibility /> : <VisibilityOff />
              }
              aria-describedby="component-error-text"
        />
          <FormHelperText id="component-error-text" style ={{color :"red"}}>{errors === true ? "Invalid Login" : ""}</FormHelperText>
      
              <Button type="submit" color="primary" variant="contained" fullWidth>
                <Typography
                  style={{ textAlign: "center", color: "#fff" }}
                  variant="button"
             
                >
                  {labelsText.submit}
                </Typography>
              </Button>
            </form>
          
        </Grid>
      </Grid>
    );
  };
  export default ForgetPs;