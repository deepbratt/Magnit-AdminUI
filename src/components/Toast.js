import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Toast = (props) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={props.open}
      onClose={props.onClose}
      autoHideDuration={5000}
    >
      <Alert onClose={props.onClose} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast
