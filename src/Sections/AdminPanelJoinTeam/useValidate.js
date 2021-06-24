const validate = (data) => {
  const errors = {};
  if (!data.text) {
    errors.text = "Text is required";
  } else if (data.text.length < 13) {
    errors.text = "Text needs to be greater than 13";
  }
  if (!data.link) {
    errors.link = "Link is required";
  }
  if (!data.buttonLabel) {
    errors.buttonLabel = "button label is required";
  }
  return errors;
};
export default validate;
