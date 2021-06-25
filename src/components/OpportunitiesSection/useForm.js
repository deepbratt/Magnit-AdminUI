import { useState, useEffect, useCallback } from "react";
import { fieldNames, messages } from "../../Utils/formConstants";
import {
  getAllOpportunitiesApi,
  addOpportunitiesApi,
  updateOpportunitiesApi,
} from "../../Utils/opportunitiesApi";

const initialValues = {
  title: "",
  description: "",
  buttonLabel: "",
  buttonLink: "",
  location: "",
  id: null,
};

export const useForm = (validateOnChange = false) => {
  const [values, setValues] = useState(initialValues);
  const [rows, setRows] = useState([]);
  const [errors, setErrors] = useState({});
  const [update, setUpdate] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
  });

  const getAllOpportunities = useCallback(async () => {
    setIsLoading(true);
    await getAllOpportunitiesApi()
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
    getAllOpportunities();
  }, [getAllOpportunities]);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if (fieldNames.title in fieldValues) {
      temp.title = fieldValues.title.trim() === "" ? messages.isRequired : "";
    }
    if (fieldNames.description in fieldValues) {
      temp.description =
        fieldValues.description.trim() === "" ? messages.isRequired : "";
    }
    if (fieldNames.location in fieldValues) {
      temp.location =
        fieldValues.location.trim() === "" ? messages.isRequired : "";
    }
    if (fieldNames.buttonLabel in fieldValues) {
      temp.buttonLabel =
        fieldValues.buttonLabel.trim() === "" ? messages.isRequired : "";
    }
    if (fieldNames.buttonLink in fieldValues) {
      temp.buttonLink =
        fieldValues.buttonLink.trim() === "" ? messages.isRequired : "";
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
      let requestBody = {
        title: values.title,
        description: values.description,
        location: values.location,
        buttonLabel: values.buttonLabel,
        link: values.buttonLink,
      };

      if (!update) {
        await addOpportunitiesApi(requestBody)
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
        await updateOpportunitiesApi(values.id, requestBody)
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
    getAllOpportunities();
  };

  return {
    rows,
    getAllOpportunities,
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
    isLoading,
    responseMessage,
    setResponseMessage,
  };
};
