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

import { navigate } from "@reach/router";

export const Login = () => {

  const { root, div, logo, label, form, forget } = FormStyle();
  const { toggleShow,handleSubmit,values,handleInputChange,errors,loading,} = useForm(true);

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
        <FormHelperText id="component-error-text" style ={{color :"red"}}>{errors === true ? "invalid Login" : ""}</FormHelperText>
            <InputLabel className={label} htmlFor="input-name">
              {labelsText.password}
            </InputLabel>
            <PasswordField
              id="outlined-adornment-password"
              type={values.hiddenPassword === true ? "text" : "password"}
              name={fieldName.password}
              value={values.password}
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
    
            <Typography className={forget} onClick={() => navigate("/Forget-Pass")}>
              Forgot Password?
            </Typography>
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
                {loading ? 'Loading...' : labelsText.signin}
              </Typography>
            </Button>
          </form>
      
      </Grid>
    </Grid>
  );
};
