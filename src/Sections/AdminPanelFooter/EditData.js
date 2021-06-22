import React, { useEffect, useState } from "react";
import { Grid, Button} from "@material-ui/core";
import axios from "axios";
import AddressField from "./AddressField";
import ContactField from "./ContactField";
import SocialMediaField from "./SocialMediaField";
import useStyles from "../AdminPanelSliderSections/useStyles";
import useStates from "./useStates";
import Toast from "../../components/Toast";
const EditData = ({ id, edit }) => {
  const { grid} = useStyles();
  const [isPending, setIsPending] = useState(true);
  const [toastType, setToastType] = useState('error');
  const [open, setOpen] = useState(false);
  const [responseAlert, setResponseAlert] = useState({
    status: "",
    message: "",
  });
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  
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
    setNumberTitle,
    setAddressTitle,
    setLinkTitle
  } = useStates();

  useEffect(() => {
    loadSelectedData();
  }, []);

  const loadSelectedData = async () => {
    const {data} = await axios.get(`http://3.138.190.235/v1/companies/${id}`);
    setNumberTitle(data.data.result.contactUs.heading)
    setAddressTitle(data.data.result.locations.heading)
    setLinkTitle(data.data.result.socialMedia.heading)
    setAddressArray(data.data.result.locations.dataArray);
    setArray(data.data.result.contactUs.dataArray);
    setLinkArray(data.data.result.socialMedia.dataArray);
    console.log(data)

  
  };

  const handleEdit = async () => {
  
    try{
     const rawResponse = await fetch(`http://3.138.190.235/v1/companies/${id}`, {
       method: 'PUT',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({   
        locations:{
          heading: addressTitle,
          dataArray: addressArray
        },
        contactUs:{
          heading: numberTitle,
          dataArray: array
        },
        socialMedia:{
          heading: linkTitle,
          dataArray: linkArray
        }
        })
     });
     const {data,status} = await rawResponse.json();
     if (status === "success") {
      setIsPending(false);
      setResponseAlert({
        status: data.status,
        message: "Updated Successfully",
      });
      setOpen(true);
      setToastType('success')
    }
    }
    catch(error){
      if (error) {
        setIsPending(true);
        setResponseAlert({
          status: error.status,
          message: error.message,
        });
        setOpen(true);
        setToastType('error')
      }
    }
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
            handleEdit()
            setTimeout(() => {
              edit(false);
            }, 5000);
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
      {responseAlert && (
          <Toast
            open={open}
            severity={toastType}
            message={responseAlert.message}
            onClose={handleToastClose}
          />
        )}
      </Grid>
    </>
  );
};

export default EditData;
