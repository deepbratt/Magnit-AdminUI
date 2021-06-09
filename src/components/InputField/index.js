import TextField from "@material-ui/core/TextField";
import LayoutStyle from "./style";

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
  const { root, input } = LayoutStyle();
  return (
    <TextField
      className={root}
      placeholder={placeholder}
      name={name}
      value={value}
      variant={variant}
      multiline={multiline}
      fullWidth={fullWidth}
      rows={rows}
      size={size}
      rowsMax={rowsMax}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      InputProps={{
        classes: { input: input },
      }}
    />
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