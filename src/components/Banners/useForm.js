import { useState, useEffect, useCallback } from "react";
import {
  getAllBannersApi,
  addBannerApi,
  updateBannerApi,
} from "../../Utils/bannersApi";
import { fieldNames, messages } from "../../Utils/formConstants";

const initialValues = {
  heading: "",
  subHeading: "",
  buttonLabel: "",
  buttonLink: "",
  type: "",
  image: null,
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
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
  });

  const handleCapture = ({ target }) => {
    setSelectedFile(target.files[0]);
  };

  const getAllBanners = useCallback(async () => {
    setIsLoading(true);
    await getAllBannersApi()
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
    getAllBanners();
  }, [getAllBanners]);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if (fieldNames.heading in fieldValues) {
      temp.heading =
        fieldValues.heading.trim() === "" ? messages.isRequired : "";
    }

    if (fieldNames.type in fieldValues) {
      temp.type = fieldValues.type.trim() === "" ? messages.isRequired : "";
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
      formData.append("heading", values.heading);
      formData.append("subHeading", values.subHeading);
      formData.append("buttonLabel", values.buttonLabel);
      formData.append("buttonLink", values.buttonLink);
      formData.append("type", values.type);
      formData.append("image", selectedFile);

      if (!update) {
        await addBannerApi(formData)
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
        await updateBannerApi(values.id, formData)
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
    getAllBanners();
  };

  return {
    rows,
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
    selectedFile,
    setSelectedFile,
    handleCapture,
  };
};
