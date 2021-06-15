import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, CardActionArea } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  addNew: {
    margin: "10px 0",
    maxWidth: "220px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.2)",
      cursor: "pointer",
      boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
    },
  },
  button: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: "50px 80px",
  },
}));

const NewItemButton = ({ name, handleClick }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.addNew} onClick={handleClick} elevation={0}>
      <CardActionArea className={classes.button}>
        {name ? (
          <Typography align="center" variant="h6">
            {name}
          </Typography>
        ) : (
          <AddIcon color="primary" />
        )}
      </CardActionArea>
    </Paper>
  );
};

NewItemButton.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default NewItemButton;
