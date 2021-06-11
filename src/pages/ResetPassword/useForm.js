import { useState } from "react";
import { fieldNames, messages } from "../../Utils/formConstants";

const initialValues = {
  password: "",
  confirmPassword: "",
};

export const useForm = (validateOnChange = false) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  // const history = useHistory();

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
      console.log(values);
      let requestBody = {
        password: values.password,
        confirmPassword: values.confirmPASSWORD,
      };
      console.log("reset-pass", requestBody);
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
  };
};
