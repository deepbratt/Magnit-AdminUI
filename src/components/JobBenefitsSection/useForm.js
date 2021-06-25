import { useState, useEffect, useCallback } from "react";
import { fieldNames, messages } from "../../Utils/formConstants";
import {
  getAllBenefitsApi,
  addBenefitsApi,
  updateBenefitsApi,
} from "../../Utils/jobBenefitsSectionApi";

const initialValues = {
  title: "",
  description: "",
  buttonLabel: "",
  buttonLink: "",
  image: null,
  id: null,
};

export const useForm = (validateOnChange = false) => {
  const [values, setValues] = useState(initialValues);
  const [rows, setRows] = useState([]);
  const [errors, setErrors] = useState({});
  const [update, setUpdate] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
  });

  const handleCapture = ({ target }) => {
    setSelectedFile(target.files[0]);
  };

  const getAllBenefits = useCallback(async () => {
    setIsLoading(true);
    await getAllBenefitsApi()
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
    getAllBenefits();
  }, [getAllBenefits]);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if (fieldNames.title in fieldValues) {
      temp.title = fieldValues.title.trim() === "" ? messages.isRequired : "";
    }
    if (fieldNames.description in fieldValues) {
      temp.description =
        fieldValues.description.trim() === "" ? messages.isRequired : "";
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

    setSelectedFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsLoading(true);
      var formData = new FormData();
      formData.append("title", values.title);
      formData.append("text", values.description);
      formData.append("buttonLabel", values.buttonLabel);
      formData.append("link", values.buttonLink);
      formData.append("icon", selectedFile);
      console.log(formData, values.title);
      if (!update) {
        await addBenefitsApi(formData)
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
        await updateBenefitsApi(values.id, formData)
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
    getAllBenefits();
  };

  return {
    rows,
    getAllBenefits,
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
    selectedFile,
    setSelectedFile,
    handleCapture,
    setResponseMessage,
  };
};
