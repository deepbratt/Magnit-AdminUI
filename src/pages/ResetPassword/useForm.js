import { useState } from "react";
import { useHistory } from "react-router-dom";
import { fieldNames, messages } from "../../Utils/formConstants";
import { resetPasswordApi } from "../../Utils/loginApi";

const initialValues = {
  password: "",
  confirmPassword: "",
};

export const useForm = (token, validateOnChange = false) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if (fieldNames.password in fieldValues) {
      temp.password = fieldValues.password.length < 5 ? messages.password : "";
    }
    if (fieldNames.confirmPassword in fieldValues) {
      temp.confirmPassword =
        fieldValues.confirmPassword !== fieldValues.password
          ? messages.notMatch
          : "";
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("btn clicked", values);
    if (validate()) {
      setIsLoading(true);
      console.log(values, token);
      let requestBody = {
        password: values.password,
        passwordConfirm: values.confirmPassword,
      };
      await resetPasswordApi(token, requestBody)
        .then((response) => {
          setIsLoading(false);
          console.log("response", response);
          if (response.status === "success") {
            history.push("/login");
          }
          if (response.status === "fail") {
            setResponseMessage(response.message);
            resetForm();
          }

          console.log("resp", response);
        })
        .catch((error) => {
          setResponseMessage(error.message);
        });
    }
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    validate,
    handleSubmit,
    isLoading,
    responseMessage,
  };
};
