import { useState, useEffect, useCallback } from "react";
import { fieldNames, messages } from "../../Utils/formConstants";
import {
  addAppSolutionsApi,
  updateAppSolutionsApi,
  getAllAppSolutionsApi,
} from "../../Utils/appSolutionsApi";

const initialValues = {
  title: "",
  description: "",
  icon: null,
  image: null,
  dataArray: [],
  id: null,
};

export const useForm = (validateOnChange = false) => {
  const [values, setValues] = useState(initialValues);
  const [rows, setRows] = useState([]);
  const [errors, setErrors] = useState({});
  const [update, setUpdate] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
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

  const getAllAppSolutions = useCallback(async () => {
    setIsLoading(true);
    await getAllAppSolutionsApi()
      .then((response) => {
        setIsLoading(false);
        if (response.status === "success") {
          setRows(response.data.result);
        } else {
          setResponseMessage({
            status: "error",
            message: response.message,
          });
          setAlertOpen(true);
        }
      })
      .catch((error) => {
        setResponseMessage({
          status: "error",
          message: error.message,
        });
        setAlertOpen(true);
      });
  }, []);

  useEffect(() => {
    getAllAppSolutions();
  }, [getAllAppSolutions]);

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
      let newItem = {
        title: values.title,
        description: values.description,
        icon: selectedIcon,
      };
      let newValues = values;
      console.log("before chnages new values", newValues);
      values.dataArray.push(newItem);
      values.image = selectedFile;
      console.log("new values", newValues);
      setValues(newValues);
    } else {
      setResponseMessage({
        status: "error",
        message: "Validation Failed",
      });
      setAlertOpen(true);
      resetForm();
    }
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

    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialValues);
    setSelectedFile(null);
    setSelectedIcon(null);
    setErrors({});
    setUpdate(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let requestBody = {
      image: selectedFile,
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
              status: "error",
              message: response.message,
            });
            setAlertOpen(true);
          }
        })
        .catch((error) => {
          setResponseMessage({
            status: "error",
            message: error.message,
          });
          setAlertOpen(true);
        });
    } else {
      await updateAppSolutionsApi(values.id, requestBody)
        .then((response) => {
          setIsLoading(false);
          if (response.status === "success") {
            setResponseMessage({
              status: response.status,
              message: "Item Updated Successfully",
            });
            setAlertOpen(true);
            resetForm();
          } else {
            setResponseMessage({
              status: "error",
              message: response.message,
            });
            setAlertOpen(true);
          }
        })
        .catch((error) => {
          setResponseMessage({
            status: "error",
            message: error.message,
          });
          setAlertOpen(true);
        });
    }
    getAllAppSolutions();
  };

  return {
    rows,
    setRows,
    alertOpen,
    setAlertOpen,
    getAllAppSolutions,
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
  };
};
