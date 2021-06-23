import React, { useState } from "react";
import { TextField, InputLabel, Grid , Divider} from "@material-ui/core";
import useStyles from "../AdminPanelSliderSections/useStyles";
import ListItems from "./ListItems";
import { Typography } from "@material-ui/core";
const AddressField = ({
  title,
  setInput,
  heading,
  setChange,
  office,
  Address,
  addAddress,
  addressArray,
  setAddressArray,
  edit,
  errors,
  headingChange,
  bool
}) => {
  const { labels, common } = useStyles();

  const [editing, setEditing] = useState(null);
  const [currentTodo, setCurrentTodo] = useState({
    officeType: "",
    address: "",
  });
  function submitEdits(id) {
    const updatedData = [...addressArray].map((data, index) => {
      if (index === id) {
        data = currentTodo;
      }
      return data;
    });
    setAddressArray(updatedData);
    setEditing(null);
  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, [e.target.name]: e.target.value });
  }

  function handleEditClick(id, number, country, officeType, address) {
    setEditing(id);
    setCurrentTodo({
      officeType: officeType,
      address: address,
    });
  }
  return (
    <>
    <Grid container justify="center" style={{margin: "30px 0px 10px 0px"}} lg={12} xs={12} >
      <Typography variant="h6">
        Address Data
      </Typography>
    </Grid>
    <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Heading</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          name="heading"
          disabled={bool}
          value={heading}
          required
          onChange={(e) => headingChange(e)}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Address Title</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          name="addressTitle"
          value={title}
          required
          onChange={(e) => setInput(e)}
          style={{ width: "100%" }}
        />
         {!edit ?
          <p style={{ color: "red" }}>{errors.addressTitle}</p>
        : null}
      </Grid>

        <>
          <Grid className={common} item lg={2} md={5} sm={10} xs={12}>
            <InputLabel className={labels}>Office Type</InputLabel>
              <TextField
                type="text"
                name="officeType"
                value={office}
                variant="outlined"
                autoComplete="off"
                required
                onChange={(e) => setChange(e)}
                style={{ width: "100%" }}
              />
          </Grid>
          <Grid className={common} item lg={2} md={5} sm={10} xs={12}>
            <InputLabel className={labels}>Address</InputLabel>
              <TextField
                placeholder="2317 Jewel Corner Apt. 197"
                type="text"
                name="address"
                value={Address}
                variant="outlined"
                autoComplete="off"
                required
                onChange={(e) => setChange(e)}
                style={{ width: "100%" }}
              />
          </Grid>
        </>
      <ListItems
            arr={addressArray}
            handleAddList={addAddress}
            setArr={setAddressArray}
            submitEdits={submitEdits}
            handleEditInputChange={handleEditInputChange}
            handleEditClick={handleEditClick}
            editing={editing}
            firstField={currentTodo.officeType}
            secondField={currentTodo.address}
            firstName="officeType"
            secondName="address"
            edit={edit}
            setEditing={setEditing}
          />
          <Grid item xs={12} style={{marginBottom: "30px"}}>
          <Divider />
          </Grid>
    </>
  );
};

export default AddressField;
