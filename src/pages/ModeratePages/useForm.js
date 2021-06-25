import { useState, useEffect, useCallback } from "react";
import {
  addPagesApi,
  getAllPagesApi,
  updatePagesApi,
} from "../../Utils/pagesApi";
import { fieldNames, messages } from "../../Utils/formConstants";
import useStates from "../../Sections/AdminPanelFooter/useStates";

const initialValues = {
  title: "",
  description: "",
  keywords: "",
  canonical: "",
  heading: "",
  subHeading: "",
  metaData: {},
  sections: {},
  sectionName: "banner",
  query: "",
  order: 0,
  id: "",
};

export const useForm = (validateOnChange = false, id) => {
  const [values, setValues] = useState(initialValues);
  const [rows, setRows] = useState([]);
  const [editSection, setEditSection] = useState(false);
  const [sectionValue, setSectionValue] = useState({
    heading: "something",
    subHeading: "something",
    sectionName: "banner",
    query: "",
    order: 0,
  });
  const [errors, setErrors] = useState({});
  const [update, setUpdate] = useState(false);
  const [sectionKeys, setSectionKeys] = useState(Object.keys(values.sections));
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
  });

  const addSection = () => {
    let newSection = {
      heading: values.heading,
      subHeading: values.subHeading,
      queryParams: values.query.length > 0 ? JSON.parse(values.query) : {},
      order: values.order,
    };
    let newValues = values;
    values.sections[values.sectionName] = newSection;
    console.log("newValues", newValues);
    setValues(newValues);
    setSectionKeys(Object.keys(values.sections));
  };

  const getAllPages = useCallback(async () => {
    setIsLoading(true);
    await getAllPagesApi()
      .then((response) => {
        setIsLoading(false);
        if (response.status === "success") {
          setRows(response.data.result);
        } else {
          setResponseMessage({
            status: "error",
            message: response.message,
          });
          setAlertOpen(true);
        }
      })
      .catch((error) => {
        setResponseMessage({
          status: "error",
          message: error.message,
        });
        setAlertOpen(true);
      });
  }, []);

  useEffect(() => {
    getAllPages();
  }, [getAllPages]);

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
    setSectionKeys([]);
    setErrors({});
    setUpdate(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Section name", values.sectionName);
    console.log("Section", values.sections);
    console.log("values", values);

    if (validate()) {
      setIsLoading(true);
      let requestBody = {
        metaData: {
          title: values.title,
          description: values.description,
          canonical: values.canonical,
          keywords: values.keywords,
        },
        sections: values.sections,
      };
      console.log("request", requestBody);
      if (!update) {
        await addPagesApi(requestBody)
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
        console.log("id", values.id);
        await updatePagesApi(values.id, requestBody)
          .then((response) => {
            setIsLoading(false);
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
    getAllPages();
  };

  return {
    editSection,
    setEditSection,
    sectionValue,
    setSectionValue,
    rows,
    setRows,
    getAllPages,
    addSection,
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
    sectionKeys,
    setSectionKeys,
  };
};
