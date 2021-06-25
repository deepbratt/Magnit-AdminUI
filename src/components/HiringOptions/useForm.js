import { useState, useEffect, useCallback } from "react";
import { fieldNames, messages } from "../../Utils/formConstants";
import {
  getAllHiringOptionsApi,
  addHiringOptionsApi,
  updateHiringOptionsApi,
} from "../../Utils/hiringOptionsApi";

const initialValues = {
  heading: "",
  text: "",
  buttonLabel: "",
  buttonLink: "",
  items: [],
  id: null,
};

export const useForm = (validateOnChange = false) => {
  const [values, setValues] = useState(initialValues);
  const [rows, setRows] = useState([]);
  const [errors, setErrors] = useState({});
  const [update, setUpdate] = useState(false);
  const [item, setItem] = useState("");
  const [items, setItems] = useState(values.items);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
  });

  const getAllHiringOptions = useCallback(async () => {
    setIsLoading(true);
    await getAllHiringOptionsApi()
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
    getAllHiringOptions();
  }, [getAllHiringOptions]);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if (fieldNames.heading in fieldValues) {
      temp.heading =
        fieldValues.heading.trim() === "" ? messages.isRequired : "";
    }
    if (fieldNames.text in fieldValues) {
      temp.text = fieldValues.text.trim() === "" ? messages.isRequired : "";
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
    setItems([]);
    setItem("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsLoading(true);
      let requestBody = {
        heading: values.heading,
        text: values.text,
        buttonLabel: values.buttonLabel,
        buttonLink: values.buttonLink,
        items: items,
      };

      if (!update) {
        await addHiringOptionsApi(requestBody)
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
        await updateHiringOptionsApi(values.id, requestBody)
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
    getAllHiringOptions();
  };

  return {
    rows,
    setRows,
    getAllHiringOptions,
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
  };
};
