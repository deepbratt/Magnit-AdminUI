import React,{useState} from "react";
import { Grid, Button } from "@material-ui/core";
import AddressField from "./AddressField";
import ContactField from "./ContactField";
import SocialMediaField from "./SocialMediaField";
import Alert from "@material-ui/lab/Alert";
import useStyles from "../AdminPanelSliderSections/useStyles";
import Toast from "../../components/Toast";
import useStates from "./useStates";
const AddData = () => {
  const [isPending, setIsPending] = useState(true);
  const [open, setOpen] = useState(false);
  const [responseAlert, setResponseAlert] = useState({
    status: "",
    message: "",
  });

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
    setArray,
    file
  } = useStates();

  
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };


  const handleAddData = async () => {
  
    try{
     const rawResponse = await fetch("http://3.138.190.235/v1/companies", {
       method: 'POST',
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
     const {status} = await rawResponse.json();
     if(status === "success"){
      setIsPending(false);
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
          file={file}
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
            handleAddData()
     
          }}
          variant="contained"
          className={btn}
        >
          Add Data
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{marginLeft: "15px"}}
        >
         Clear Field
        </Button>
      </Grid>
      <Grid item style={{marginBottom: "30px"}}>
      {responseAlert && (
          <Toast
            open={open}
            severity={responseAlert.status}
            message={responseAlert.message}
            onClose={handleToastClose}
          />
        )}
           {!isPending ?   <Alert severity="success">Status: Added successfully!</Alert> : null}
      </Grid>
    </>
  );
};

export default AddData;
