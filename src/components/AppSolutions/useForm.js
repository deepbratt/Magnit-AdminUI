import { useState } from "react";
import { fieldNames, messages } from "../../Utils/formConstants";
import {
  addAppSolutionsApi,
  updateAppSolutionsApi,
} from "../../Utils/appSolutionsApi";

const initialValues = {
  image: null,
  dataArray: [],
  id: null,
};

export const useForm = (validateOnChange = false, id) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [update, setUpdate] = useState(false);
  const [items, setItems] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
  });

  const [item, setItem] = useState({
    title: "",
    description: "",
    icon: selectedIcon,
  });

  const handleCapture = ({ target }) => {
    const file = target.files[0];
    getBase64(file)
      .then((result) => {
        setSelectedFile(result);
      })
      .catch((e) => console.log(e));
  };

  const handleIconCapture = ({ target }) => {
    const file = target.files[0];
    getBase64(file)
      .then((result) => {
        setSelectedIcon(result);
      })
      .catch((e) => console.log(e));
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if (fieldNames.title in fieldValues) {
      temp.title = fieldValues.title.trim() === "" ? messages.isRequired : "";
    }
    if (fieldNames.description in fieldValues) {
      temp.description =
        fieldValues.description.trim() === "" ? messages.isRequired : "";
    }

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const addItem = () => {
    if (validate()) {
      setItem({
        title: item.title,
        description: item.description,
        icon: selectedIcon,
      });
    }
    let temp = items;
    temp.push(item);
    setItems(temp);
    setValues({ image: selectedFile, dataArray: items });
  };

  const getBase64 = (file) =>
    new Promise(function (resolve, reject) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject("Error: ", error);
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setItem({
      ...item,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const test = () => {
    let temp = items;
    temp.push(item);
    setItems(temp);
    setValues({ image: selectedFile, dataArray: items });
  };

  const resetForm = () => {
    setValues(initialValues);
    setSelectedFile(null);
    setSelectedIcon(null);
    setErrors({});
    setUpdate(false);
    setItems([]);
    setItem({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let requestBody = {
      image: values.image,
      dataArray: values.dataArray,
    };
    console.log("request", requestBody);
    if (!update) {
      await addAppSolutionsApi(requestBody)
        .then((response) => {
          setIsLoading(false);
          resetForm();
          if (response.status === "success") {
            setResponseMessage({
              status: response.status,
              message: "Item Added Successfully",
            });
            setAlertOpen(true);
            resetForm();
          } else {
            setResponseMessage({
              status: response.status,
              message: response.message,
            });
            setAlertOpen(true);
          }
        })
        .catch((error) => {
          setResponseMessage({
            status: error.status,
            message: error.message,
          });
          setAlertOpen(true);
        });
    } else {
      console.log("id", id);
      await updateAppSolutionsApi(values.id, requestBody)
        .then((response) => {
          if (response.status === "success") {
            setResponseMessage({
              status: response.status,
              message: "Item Updated Successfully",
            });
            setAlertOpen(true);
            resetForm();
          } else {
            setResponseMessage({
              status: response.status,
              message: response.message,
            });
            setAlertOpen(true);
          }
        })
        .catch((error) => {
          setResponseMessage({
            status: error.status,
            message: error.message,
          });
          setAlertOpen(true);
        });
    }
  };

  return {
    alertOpen,
    setAlertOpen,
    item,
    setItem,
    items,
    setItems,
    values,
    setValues,
    errors,
    setErrors,
    update,
    setUpdate,
    handleInputChange,
    resetForm,
    validate,
    handleSubmit,
    isLoading,
    responseMessage,
    setResponseMessage,
    selectedFile,
    setSelectedFile,
    handleCapture,
    handleIconCapture,
    selectedIcon,
    setSelectedIcon,
    addItem,
    test,
  };
};
