const validate = (data) => {
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
  if (!data.text) {
    errors.text = "Text is required";
  } else if (data.text.length < 12) {
    errors.text = "Text needs to be greater than 12";
  }
  return errors;
};
export default validate;
