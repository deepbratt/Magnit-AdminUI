import { useTheme } from "@material-ui/core/styles";
import { Button, Grid, InputLabel, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import FullPageDialog from "../../components/FullPageDialog";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import { useState } from "react";
import ModeratePagesStyles from "./style";

const names = [
  "Banner",
  "Awards",
  "Certificates",
  "Reviews",
  "Latest Blogs",
  "Trending Blogs",
];

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddNewPage = ({ open, handleClose }) => {
  const { form, multipleInput, chips, chip, buttonWrap } =
    ModeratePagesStyles();
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  return (
    <FullPageDialog open={open} handleClose={handleClose}>
      <Grid container>
        <Grid container item xs={12}>
          <form className={form}>
            <Grid item xs={12} md={6}>
              <InputLabel id="input-title">Title</InputLabel>
              <TextField
                labelId="input-title"
                id="input-title"
                variant="outlined"
                placeholder="Careers | The Magnit"
                size="medium"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel id="input-canonical">Canonical</InputLabel>
              <TextField
                labelId="input-canonical"
                id="input-canonical"
                variant="outlined"
                placeholder="/careers"
                size="medium"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel id="input-discription">Discription</InputLabel>
              <TextField
                labelId="input-discription"
                id="input-discription"
                variant="outlined"
                placeholder="/careers"
                size="medium"
                fullWidth
                multiline
                rows={3}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel id="input-keywords">Keywords</InputLabel>
              <TextField
                labelId="input-keywords"
                id="input-keywords"
                variant="outlined"
                placeholder="magnit, careers, job"
                size="medium"
                fullWidth
                multiline
                rows={3}
                required
              />
            </Grid>
            <Grid item xs={10} md={6}>
              <InputLabel id="input-sections">Sections</InputLabel>
              <Select
                className={multipleInput}
                labelId="input-sections"
                id="input-sections"
                variant="outlined"
                multiple
                value={personName}
                onChange={handleChange}
                input={<Input id="input-sections" />}
                renderValue={(selected) => (
                  <div className={chips}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} className={chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel id="input-query">Query</InputLabel>
              <TextField
                labelId="input-query"
                id="input-quer"
                variant="outlined"
                placeholder="query e.g blogs=latest"
                size="medium"
                fullWidth
                required
              />
            </Grid>
            <Grid className={buttonWrap} item xs={12} md={6}>
              <Button
                style={{ maxWidth: "100px" }}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </FullPageDialog>
  );
};

FullPageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddNewPage;
