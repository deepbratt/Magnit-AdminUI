import React, { useState } from "react";
import { TextField, InputLabel, Grid } from "@material-ui/core";
import useStyles from "../AdminPanelSliderSections/useStyles";
import ListItems from "./ListItems";
const AddressField = ({
  title,
  setInput,
  id,
  setChange,
  office,
  Address,
  addAddress,
  addressArray,
  setAddressArray,
  edit,
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
      <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
        <InputLabel className={labels}>Address Title</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          name="addressTitle"
          value={title}
          onChange={(e) => setInput(e)}
          style={{ width: "100%" }}
        />
      </Grid>
      {!edit ? (
        <>
          {" "}
          <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
            <InputLabel className={labels}>Office Type</InputLabel>
            <form id={id}>
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
            </form>
          </Grid>
          <Grid className={common} item lg={5} md={5} sm={10} xs={12}>
            <InputLabel className={labels}>Address</InputLabel>
            <form id={id}>
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
            </form>
          </Grid>
        </>
      ) : (
       null
      )}
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
          />
    </>
  );
};

export default AddressField;
