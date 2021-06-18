import React, { useEffect, useState } from "react";
import { Grid, Button} from "@material-ui/core";
import axios from "axios";
import AddressField from "./AddressField";
import ContactField from "./ContactField";
import SocialMediaField from "./SocialMediaField";
import Alert from "@material-ui/lab/Alert";
import useStyles from "../AdminPanelSliderSections/useStyles";
import useApi from "../../Utils/useApi";
import useStates from "./useStates";
const EditData = ({ id, edit }) => {
  const { addData, isPending } = useApi("");
  const { grid} = useStyles();
  const {
    numberTitle,
    addressTitle,
    linkTitle,
    number,
    country,
    inputContact,
    inputContactCountry,
    inputAddress,
    linkChange,
    addressTitleChange,
    fileChange,
    linkTitleChange,
    numberChange,
    addLink,
    officeType,
    address,
    link,
    title,
    addressArray,
    addAddress,
    setAddressArray,
    linkArray,
    setLinkArray,
    add,
    array,
    setArray,
  } = useStates();

  // useEffect(() => {
  //   loadSelectedData();
  // }, []);

  const loadSelectedData = async () => {
    // const result = await axios.get(`http://3.138.190.235/v1/sliders/${id}`);
    // setArray(result.data.data);
    // // setArray(result.data.data.result.items);
  };
  return (
    <>
      <Grid className={grid} lg={12} item xs={12}>
        <AddressField
          title={addressTitle}
          setInput={addressTitleChange}
          Address={address}
          office={officeType}
          setChange={inputAddress}
          addAddress={addAddress}
          addressArray={addressArray}
          setAddressArray={setAddressArray}
          id={id}
          edit={edit}
        />
        <ContactField
          number={number}
          country={country}
          setInput={numberChange}
          title={numberTitle}
          countryInput={inputContactCountry}
          inputContact={inputContact}
          add={add}
          array={array}
          setArray={setArray}
          id={id}
          edit={edit}
        />
        <SocialMediaField
          setFile={fileChange}
          title={linkTitle}
          setInput={linkTitleChange}
          setinput={linkChange}
          Title={title}
          link={link}
          linkArray={linkArray}
          setLinkArray={setLinkArray}
          addLink={addLink}
          id={id}
          edit={edit}
        />
      </Grid>
      <Grid item style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="submit"
          onClick={() => {
            // updateData(id, formData);
            setTimeout(() => {
              edit(false);
            }, 2000);
          }}
          variant="contained"
          color="primary"
        >
          Update Data
        </Button>
        <Button
          type="submit"
          onClick={() => edit(false)}
          variant="contained"
          color="secondary"
          style={{ marginLeft: "15px" }}
        >
          Cancel Edit
        </Button>
      </Grid>
      <Grid item style={{marginTop: "20px"}} >
      {isPending ? (
        <Alert severity="info">Status: pending!</Alert>
      ) : (
        <Alert severity="success">Status: Added successfully!</Alert>
      )}
      </Grid>
    </>
  );
};

export default EditData;
