const validate = (data) => {
  const errors = {};
  if (!data.title) {
    errors.title = "Title is required";
  }
  if (!data.text) {
    errors.text = "Text is required";
  } else if (data.text.length < 13) {
    errors.text = "Text needs to be greater than 13";
  }
  return errors;
};
export default validate;
