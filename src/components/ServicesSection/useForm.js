import { useState } from "react";
import { fieldNames, messages } from "../../Utils/formConstants";
import { addServicesApi } from "../../Utils/servicesSectionApi";

const initialValues = {
  title: "",
  description: "",
  buttonLabel: "",
  buttonLink: "",
  image: null,
};

export const useForm = (validateOnChange = false) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let reader = new FileReader();
    // reader.readAsDataURL(selectedFile);
    // reader.onloadend = () => {
    //   console.log(reader.result);
    //   values.image = reader.result;
    //   //   setSelectedFile(reader.result);
    // };
    // console.log("btn clicked", values);
    if (validate()) {
      setIsLoading(true);

      let requestBody = {
        title: values.title,
        description: values.description,
        buttonLabel: values.buttonLabel,
        buttonLink: values.buttonLink,
        image: selectedFile,
      };
      console.log(requestBody);
      await addServicesApi(requestBody)
        .then((response) => {
          setIsLoading(false);
          console.log("response", response);
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
    selectedFile,
    handleCapture,
  };
};
