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
    setSelectedFile(target.files[0]);
  };

  const handleIconCapture = ({ target }) => {
    setSelectedIcon(target.files[0]);
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
    // let temp = items;
    // temp.push(item);
    // setItems(temp);
    // setValues({ image: selectedFile, dataArray: items });
  };

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

    console.log("item", item);

    console.log("items", values);

    setIsLoading(true);
    let formData = new FormData();
    formData.append("image", values.image);
    formData.append("dataArray", values.dataArray);
    console.log("request", formData);
    if (!update) {
      await addAppSolutionsApi(formData)
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
      await updateAppSolutionsApi(values.id, formData)
        .then((response) => {
          setIsLoading(false);
          resetForm();
        })
        .catch((error) => {
          setResponseMessage(error.message);
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
