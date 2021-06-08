import React from "react";
import { TextField } from "@material-ui/core";
import InputStyle from "./style";

const InputField = ({
  value,
  multiline,
  fullWidth,
  placeholder,
  name,
  variant,
  size,
  rows,
  rowsMax,
  error = null,
  onChange,
}) => {
  const { root, input } = InputStyle();
  return (
    <div>
      <TextField
        className={root}
        placeholder={placeholder}
        multiline={multiline}
        size={size}
        variant={variant}
        onChange={onChange}
        {...(error && { error: true, helperText: error })}
        InputProps={{
          classes: { input: input },
        }}
        fullWidth={fullWidth}
        rows={rows}
        rowsMax={rowsMax}
      />
    </div>
  );
};

InputField.defaultProps = {
  size: "small",
  fullWidth: true,
  variant: "outlined",
  rows: "3",
  rowsMax: "3",
};

export default InputField;
