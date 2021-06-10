import { useState } from "react";
import {

  setUserSession
} from "../../Utils/form.js";
import { userLoginApi } from "../../Utils/api.js";
import {  useHistory } from "react-router";
const initialFValues = {
  
  email: "",
  password:"",
  newPassword:"",
  confirmPassword:"",
  hiddenPassword:true,

};
 export function useForm({validateOnChange=false}) {
   const history =useHistory();
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);

  // "errors" is used to check the form for errors
  
  const validate = () => {
    const { email, password,  } = values;
    if (email === "" || password === "") {
      return setErrors(true);
    } else if ( password.length < 6){
      return  setErrors(true);
    }
   else {
      setErrors(false);
    }

  }
  const handleInputChange = (e) => {
     const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
   
   if (validateOnChange) validate({ [name]: value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    e.stopPropagation();
 let requestBody = {
        email: values.email,
        password: values.password,
      };
    setErrors(null);
    setLoading(true);
    const { email, password,  } = values;
    if (email === "" || password === "") {
      return setErrors(true);
    } else if ( password.length < 6){
      return  setErrors(true);
    }
   else {
      setErrors(false);
    }
await userLoginApi (requestBody)
    .then(response => {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        history.push("/");
    }
    ).catch(error=>{
      setLoading(false);
      if (error.status === 401) setErrors(error.data.message);
        else setErrors("Something went wrong. Please try again later.");
     })
  
    
      };
    const toggleShow =()=>{
      setValues({ hiddenPassword: !values.hiddenPassword});
    } 
  return {
    values,
    setValues,
    errors,
    loading,
    setErrors,
    handleInputChange,
    handleSubmit,
    toggleShow,
  
   
  };
}

