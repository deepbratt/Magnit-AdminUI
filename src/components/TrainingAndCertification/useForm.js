import { useState, useEffect, useCallback } from "react";
import { fieldNames, messages } from "../../Utils/formConstants";
import {
  getAllTrainingAndCertificationApi,
  addTrainingAndCertificationsApi,
  updateTrainingAndCertificationsApi,
} from "../../Utils/trainingAndCertificationApi";

const initialValues = {
  title: "",
  description: "",
  jsonFile: null,
  id: null,
};

export const useForm = (validateOnChange = false, id) => {
  const [values, setValues] = useState(initialValues);
  const [rows, setRows] = useState([]);
  const [errors, setErrors] = useState({});
  const [update, setUpdate] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCapture = ({ target }) => {
    setSelectedFile(target.files[0]);
  };

  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
  });

  const getAllTrainingAndCertification = useCallback(async () => {
    setIsLoading(true);
    await getAllTrainingAndCertificationApi()
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
    getAllTrainingAndCertification();
  }, [getAllTrainingAndCertification]);

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
    setErrors({});
    setUpdate(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsLoading(true);
      var formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("jsonFile", selectedFile);

      if (!update) {
        await addTrainingAndCertificationsApi(formData)
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
        await updateTrainingAndCertificationsApi(values.id, formData)
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
    }
    getAllTrainingAndCertification();
  };

  return {
    rows,
    setRows,
    getAllTrainingAndCertification,
    alertOpen,
    setAlertOpen,
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
    selectedFile,
    setSelectedFile,
    handleCapture,
    isLoading,
    responseMessage,
    setResponseMessage,
  };
};
