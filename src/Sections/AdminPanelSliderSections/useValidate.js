const validate = (data, list) => {
  const errors = {};
  if (!data.title) {
    errors.title = "Title is required";
  }

  if (!data.link) {
    errors.link = "Link is required";
  }
  if (!data.buttonLabel) {
    errors.buttonLabel = "Button label is required";
  }
  return errors;
};
export default validate;
