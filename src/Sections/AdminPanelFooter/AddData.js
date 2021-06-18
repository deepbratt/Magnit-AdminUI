import React from "react";
import { Grid, Button } from "@material-ui/core";
import AddressField from "./AddressField";
import ContactField from "./ContactField";
import SocialMediaField from "./SocialMediaField";
import Alert from "@material-ui/lab/Alert";
import useStyles from "../AdminPanelSliderSections/useStyles";
import useApi from "../../Utils/useApi";
import useStates from "./useStates";
const AddData = () => {
  const { addData, isPending } = useApi("");
  const { grid, btn } = useStyles();
  let id = "form";
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
    setArray
  } = useStates();

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
        />
      </Grid>
      <Grid
        item
        lg={12}
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <Button
          onClick={() => {
            // addData(formData);
            // console.log(addressArray,addressTitle)
          }}
          variant="contained"
          className={btn}
        >
          Add Data
        </Button>
      </Grid>
      {isPending ? (
        <Alert severity="info">Status: pending!</Alert>
      ) : (
        <Alert severity="success">Status: Added successfully!</Alert>
      )}
    </>
  );
};

export default AddData;
