import { useState } from "react";

const useStates = () => {
  const [file, setFile] = useState(null);
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
  const [linkTitle, setLinkTitle] = useState("");
  const [addressTitle, setAddressTitle] = useState("");
  const [array, setArray] = useState([]);
  const [addressArray, setAddressArray] = useState([]);
  const [linkArray, setLinkArray] = useState([]);

  const { country, number } = contact;
  const { officeType, address } = location;
  const { link, title } = links;

  const numberChange = (e) => {
    setNumberTitle(e.target.value);
  };

  const linkTitleChange = (e) => {
    setLinkTitle(e.target.value);
  };

  const fileChange = (e) => {
    setFile(e.target.files[0]);
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

  };

  const addAddress = () => {
    setAddressArray((prev) => [
      ...prev,
      {
        officeType: officeType,
        address: address,
      },
    ]);

  };

  const addLink = () => {
    setLinkArray((prev) => [
      ...prev,
      {
        title: title,
        link: link,
        icon: file,
      },
    ]);

  };

    const data = {
    locations: {
      heading: numberTitle,
      array: array
    },
    contactUs: {
      heading: addressTitle,
      array: addressArray
    },
    socialMedia: {
      heading: linkTitle,
      array: linkArray
    }
  }

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
    data
  };
};

export default useStates;
