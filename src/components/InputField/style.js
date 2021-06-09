import { makeStyles } from "@material-ui/core/styles";
const LayoutStyle = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    marginBottom: "16px",
  },
  input: {
    [theme.breakpoints.down("md")]: {
      fontSize: "16px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
    "&::placeholder": {
      [theme.breakpoints.down("md")]: {
        fontSize: "16px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "14px",
      },
    },
  },
}));

export default LayoutStyle;
