import { useState } from "react";
import { fieldNames, messages } from "../../Utils/formConstants";
import {
  addServicesApi,
  updateServicesApi,
} from "../../Utils/servicesSectionApi";

const initialValues = {
  title: "",
  description: "",
  buttonLabel: "",
  buttonLink: "",
  image: null,
  color: "",
  id: null,
};

export const useForm = (validateOnChange = false, id) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [update, setUpdate] = useState(false);
  const [color, setColor] = useState(values.color);

  const [isLoading, setIsLoading] = useState(false);

  const [responseMessage, setResponseMessage] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const handleCapture = ({ target }) => {
    setSelectedFile(target.files[0]);
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
    setColor("");
    setSelectedFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsLoading(true);
      var formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("buttonLabel", values.buttonLabel);
      formData.append("buttonLink", values.buttonLink);
      formData.append("color", color);
      formData.append("image", selectedFile);
      console.log(formData, values.title);
      if (!update) {
        await addServicesApi(formData)
          .then((response) => {
            setIsLoading(false);
            console.log("response", response);
          })
          .catch((error) => {
            setResponseMessage(error.message);
          });
      } else {
        console.log("id", id);
        await updateServicesApi(values.id, formData)
          .then((response) => {
            setIsLoading(false);
            console.log("response", response);
          })
          .catch((error) => {
            setResponseMessage(error.message);
          });
      }
    }
  };

  return {
    color,
    setColor,
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
  };
};
