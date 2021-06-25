import { useState } from "react";
import { addUsersApi, updateUsersApi } from "../../Utils/usersApi";
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
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
  });

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsLoading(true);
      let requestBody = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        passwordConfirm: values.confirmPassword,
        role: values.role,
      };
      console.log(requestBody, values.title);
      if (!update) {
        await addUsersApi(requestBody)
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
                status: response.status,
                message: response.message,
              });
              setAlertOpen(true);
            }
          })
          .catch((error) => {
            setResponseMessage({
              status: error.status,
              message: error.message,
            });
            setAlertOpen(true);
          });
      } else {
        console.log("id", id);
        await updateUsersApi(values.id, requestBody)
          .then((response) => {
            if (response.status === "success") {
              setResponseMessage({
                status: response.status,
                message: "Item Updated Successfully",
              });
              setAlertOpen(true);
              resetForm();
            } else {
              setResponseMessage({
                status: response.status,
                message: response.message,
              });
              setAlertOpen(true);
            }
          })
          .catch((error) => {
            setResponseMessage({
              status: error.status,
              message: error.message,
            });
            setAlertOpen(true);
          });
      }
    }
  };

  return {
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
