import React,{useState} from "react";
import { Grid, Button } from "@material-ui/core";
import AddressField from "./AddressField";
import ContactField from "./ContactField";
import SocialMediaField from "./SocialMediaField";
import Alert from "@material-ui/lab/Alert";
import useStyles from "../AdminPanelSliderSections/useStyles";
import Toast from "../../components/Toast";
import useStates from "./useStates";
import validate from "./useValidate";
const AddData = () => {
  const [isPending, setIsPending] = useState(true);
  const [open, setOpen] = useState(false);
  const [toastType, setToastType] = useState('error');
  const [responseAlert, setResponseAlert] = useState({
    status: "",
    message: "",
  });

  const { grid, btn } = useStyles();




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
    file,
    heading,
    headingChange
  } = useStates();

  const {} = validate(addressTitle,numberTitle,linkTitle);
  const [errors, setErrors] = useState({}); 

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  
  

  const handleAddData = async () => {

    const  headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : "Bearer "+localStorage.getItem('jwt')
    }
  
    try{
     const rawResponse = await fetch("http://api.themagnit.com/v1/companies", {headers}, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization' : "Bearer "+localStorage.getItem('jwt')
       },
       body: JSON.stringify({ 
        heading: heading,  
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
          status: error.response.data.status ,
          message: error.response.data.message
        });
        setOpen(true);
        setToastType('error')
      }
    }
};

const handleSubmit = () => {
  const validationErrors = validate(addressTitle,numberTitle,linkTitle);
  const noErrors = Object.keys(validationErrors).length === 0;
  setErrors(validationErrors);
  if (noErrors) {
    handleAddData()
  } else {
    return <p>errors try again</p>;
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
          errors={errors}
          heading={heading}
          headingChange={headingChange}
          bool={true}
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
          errors={errors}
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
          file={file}
          errors={errors}
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
          onClick={() => handleSubmit()}
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
            severity={toastType}
            message={responseAlert.message}
            onClose={handleToastClose}
          />
        )}
           {!isPending ?   <Alert severity="success">Status: Added successfully!</Alert>
           :  <Alert severity="info">Status: pending</Alert>}
      </Grid>
    </>
  );
};

export default AddData;
