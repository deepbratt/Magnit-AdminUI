import React from "react";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { InputAdornment, IconButton, OutlinedInput } from "@material-ui/core";
import InputStyle from "./style";

const PasswordField = ({
  value,
  multiline,
  fullWidth,
  placeholder,
  name,
  type,
  variant,
  size,
  rows,
  rowsMax,
error,
  onChange,
  onBlur,
  onClick,position,
  showPassword
}) => {
  const { root, input } = InputStyle();
  return (
    <div>
      <OutlinedInput
        className={root}
        placeholder={placeholder}
        type={type}
        onBlur={onBlur}
        value={value}
        name={name}
        multiline={multiline}
        size={size}
        variant={variant}
        onChange={onChange}
        autoComplete="none"
        error={error}
       
        // {...(error && { error: true, helperText: error })}
        InputProps={{
          classes: { input: input },
        }}
        fullWidth={fullWidth}
        rows={rows}
       
        rowsMax={rowsMax}
        endAdornment={
              <InputAdornment position={position}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={onClick}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword }
                </IconButton>
              </InputAdornment>
            }
      />
    </div>
  );
};

PasswordField.defaultProps = {
  size: "small",
  fullWidth: true,
  variant: "outlined",
  rows: "3",
  rowsMax: "3",
};

export default PasswordField;
