import PropTypes from "prop-types";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import FullPageDialog from "../../components/FullPageDialog";

const AddNewUser = ({ open, handleClose }) => {
  return (
    <FullPageDialog open={open} handleClose={handleClose}>
      <List>
        <ListItem button>
          <ListItemText primary="Phone ringtone" secondary="Titania" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            primary="Default notification ringtone"
            secondary="Tethys"
          />
        </ListItem>
      </List>
    </FullPageDialog>
  );
};

AddNewUser.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddNewUser;
