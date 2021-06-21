import { useState } from "react";
import { fieldNames, messages } from "../../Utils/formConstants";
import {
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

export const useForm = (validateOnChange = false, id) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [update, setUpdate] = useState(false);
  const [item, setItem] = useState("");
  const [items, setItems] = useState([values.items]);

  const [isLoading, setIsLoading] = useState(false);

  const [responseMessage, setResponseMessage] = useState("");

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
      console.log("request", requestBody);
      if (!update) {
        await addHiringOptionsApi(requestBody)
          .then((response) => {
            setIsLoading(false);
            resetForm();
          })
          .catch((error) => {
            setResponseMessage(error.message);
          });
      } else {
        console.log("id", id);
        await updateHiringOptionsApi(values.id, requestBody)
          .then((response) => {
            setIsLoading(false);
            resetForm();
          })
          .catch((error) => {
            setResponseMessage(error.message);
          });
      }
    }
  };

  return {
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
  };
};
