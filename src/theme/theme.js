import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      root: {
        fontSize: 20,
        margin: "20px 0px",
      },
    },
  },
});

export default theme;
