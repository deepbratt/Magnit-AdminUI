import { makeStyles } from "@material-ui/core";

const GlobalStyles = makeStyles((theme) => ({
  loginFormGrid: {
    height: "100vh",
    background:
      "linear-gradient(180.04deg, #2CD400 -46.18%, rgba(255, 255, 255, 0) 99.96%)",
  },
  formCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 100px 5px rgba(0, 0, 0, 0.06)",
    padding: "50px 60px",
    borderRadius: "10px",
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

export default GlobalStyles;
