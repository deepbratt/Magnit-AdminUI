import { useState } from "react";
import {
  
  fieldName,
  isEmailValid,
  isTypePassword,
  messages
} from "../../Utils/form.js";

const initialFValues = {
  
  email: "",
  password:"",
  newPassword:"",
  confirmPassword:"",
  rememberMe: false
 
};

export function useForm(validateOnChange = false) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
   
    if (fieldName.email in fieldValues) {
      temp.email =
        fieldValues.email.trim() === ""
          ? messages.isRequired
          : isEmailValid(fieldValues.email)
          ? ""
          : messages.notValid;
    }

    if (fieldName.password in fieldValues)
    temp.password =
      fieldValues.password.length === 0 ? messages.isRequired : isTypePassword(fieldValues.password) ? "" : messages.notValid ;
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
  function handleRememberMeChange(e) {
    setValues((inputs) => ({ ...inputs, rememberMe: !inputs.rememberMe }));
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleRememberMeChange,
    handleSubmit,
    
  };
}
