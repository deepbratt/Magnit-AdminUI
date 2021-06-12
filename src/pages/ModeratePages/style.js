import { makeStyles } from "@material-ui/core";

const ModeratePagesStyles = makeStyles((theme) => ({
  form: {
    minWidth: "100%",
    padding: "20px",
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      padding: "10px",
    },
  },
  multipleInput: {
    minWidth: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  buttonWrap: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
}));

export default ModeratePagesStyles;
