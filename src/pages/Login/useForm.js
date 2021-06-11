import { useState } from "react";
import { userLoginApi } from "../../Utils/loginApi";
import { fieldNames, isEmailValid, messages } from "../../Utils/formConstants";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/authSlice";
import { useHistory } from "react-router";

const initialValues = {
  email: "",
  password: "",
};

export const useForm = (validateOnChange = false) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

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
        email: values.email,
        password: values.password,
      };
      await userLoginApi(requestBody)
        .then((response) => {
          setIsLoading(false);
          dispatch(login(response));
          if (response.status === "success") {
            history.push("/");
          }
          console.log("resp", response);
        })
        .catch((error) => {
          console.error(error);
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
  };
};
