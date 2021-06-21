import { useState } from "react";
import { addBannerApi, updateBannerApi } from "../../Utils/bannersApi";
import { fieldNames, isEmailValid, messages } from "../../Utils/formConstants";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
};

export const useForm = (validateOnChange = false, id) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [update, setUpdate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [responseMessage, setResponseMessage] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const handleCapture = ({ target }) => {
    setSelectedFile(target.files[0]);
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if (fieldNames.firstName in fieldValues) {
      temp.firstName =
        fieldValues.firstName.trim() === "" ? messages.isRequired : "";
    }
    if (fieldNames.lastName in fieldValues) {
      temp.lastName =
        fieldValues.lastName.trim() === "" ? messages.isRequired : "";
    }

    if (fieldNames.email in fieldValues) {
      temp.email =
        fieldValues.email.trim() === ""
          ? messages.isRequired
          : isEmailValid(fieldValues.email)
          ? ""
          : messages.notValid;
    }
    if (fieldNames.password in fieldValues) {
      temp.password =
        fieldValues.password.length < 5
          ? "Password must be 8 charactors long"
          : "";
    }
    if (fieldNames.confirmPassword in fieldValues) {
      temp.confirmPassword =
        fieldValues.confirmPassword !== fieldValues.password
          ? messages.notMatch
          : "";
    }
    if (fieldNames.role in fieldValues) {
      temp.role = fieldValues.role.trim() === "" ? messages.isRequired : "";
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
      console.log(formData, values.title);
      if (!update) {
        await addBannerApi(formData)
          .then((response) => {
            setIsLoading(false);
            resetForm();
          })
          .catch((error) => {
            setResponseMessage(error.message);
          });
      } else {
        console.log("id", id);
        await updateBannerApi(values.id, formData)
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
    selectedFile,
    setSelectedFile,
    handleCapture,
  };
};
