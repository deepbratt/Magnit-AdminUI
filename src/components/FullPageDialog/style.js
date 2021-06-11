import { makeStyles } from "@material-ui/core";

const DialogBoxStyles = makeStyles((theme) => ({
  root: {
    overflowX: "hidden",
    maxWidth: "100%",
  },
  appBar: {
    position: "inherit",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default DialogBoxStyles;
