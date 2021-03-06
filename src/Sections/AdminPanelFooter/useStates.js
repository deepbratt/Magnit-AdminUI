import { useState } from "react";

const useStates = () => {
  const [file, setFile] = useState({
    file: null,
    base64URL: ""
  });

  const [contact, setContact] = useState({
    country: "",
    number: null,
  });
  const [location, setLocation] = useState({
    officeType: "",
    address: "",
  });
  const [links, setLinks] = useState({
    title: "",
    link: "",
  });
  const [numberTitle, setNumberTitle] = useState("");
  const [heading, setHeading] = useState("Footer");
  const [linkTitle, setLinkTitle] = useState("");
  const [addressTitle, setAddressTitle] = useState("");
  const [array, setArray] = useState([]);
  const [addressArray, setAddressArray] = useState([]);
  const [linkArray, setLinkArray] = useState([]);

  const { country, number } = contact;
  const { officeType, address } = location;
  const { link, title } = links;


  const getBase64 = file => {
    return new Promise(resolve => {
      let baseURL = "";
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const fileChange = e => {

   const  file = e.target.files[0];

    getBase64(file)
      .then(result => {
        file["base64"] = result;
        setFile({
          base64URL: result,
          file
        });
      })
      .catch(err => {
        console.log(err);
      });

    setFile({
      file: e.target.files[0]
    });
  };

  const numberChange = (e) => {
    setNumberTitle(e.target.value);
  };

  const headingChange = (e) => {
    setHeading(e.target.value);
  };


  const linkTitleChange = (e) => {
    setLinkTitle(e.target.value);
  };

  const addressTitleChange = (e) => {
    setAddressTitle(e.target.value);
  };

  const linkChange = (e) => {
    setLinks({ ...links, [e.target.name]: e.target.value });
  };

  const inputContact = (e) => {
    var val = e.target.value;
    setContact({
      ...contact,
      number: val.replace(/\W/gi, "").replace(/(.{4})/g, "$1 "),
    });
  };

  const inputContactCountry = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const inputAddress = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };


  const add = () => {
    setArray((prevItems) => [
      ...prevItems,
      {
        country: country,
        number: number,
      },
    ]);

    setContact({
      country: "",
      number: "",
    });
  };

  const addAddress = () => {
    setAddressArray((prev) => [
      ...prev,
      {
        officeType: officeType,
        address: address,
      },
    ]);
    setLocation({
      officeType: "",
      address: "",
    });
  };

  const addLink = () => {
    setLinkArray((prev) => [
      ...prev,
      {
        title: title,
        link: link,
        icon: file.base64URL,
      },
    ]);

    setLinks({
      title: "",
      link: "",
    });
  };

  const data = {
    locations: {
      heading: numberTitle,
      array: array,
    },
    contactUs: {
      heading: addressTitle,
      array: addressArray,
    },
    socialMedia: {
      heading: linkTitle,
      array: linkArray,
    },
  };

  return {
    file,
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
    array,
    linkArray,
    add,
    addLink,
    officeType,
    address,
    link,
    title,
    setLinkArray,
    setArray,
    addressArray,
    addAddress,
    setAddressArray,
    data,
    setNumberTitle,
    setAddressTitle,
    setLinkTitle,
    heading,
    headingChange
  };
};

export default useStates;
