import { forwardRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
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

const FullPageDialog = ({ open, handleClose, children }) => {
  const classes = useStyles();
  return (
    <Dialog
      className={classes.root}
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Add New User
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  );
};

FullPageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default FullPageDialog;
