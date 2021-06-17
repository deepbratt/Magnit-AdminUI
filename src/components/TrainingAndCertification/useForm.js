import { useState } from "react";
import { fieldNames, messages } from "../../Utils/formConstants";
import {
  addTrainingAndCertificationsApi,
  updateTrainingAndCertificationsApi,
} from "../../Utils/trainingAndCertificationApi";

const initialValues = {
  title: "",
  description: "",
  jsonText: null,
  id: null,
};

export const useForm = (validateOnChange = false, id) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [update, setUpdate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [responseMessage, setResponseMessage] = useState("");

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
      let requestBody = {
        title: values.title,
        description: values.description,
        jsonText: JSON.parse(values.jsonText),
      };

      console.log(requestBody, values.title);
      if (!update) {
        await addTrainingAndCertificationsApi(requestBody)
          .then((response) => {
            setIsLoading(false);
            resetForm();
          })
          .catch((error) => {
            setResponseMessage(error.message);
          });
      } else {
        console.log("id", id);
        await updateTrainingAndCertificationsApi(values.id, requestBody)
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
