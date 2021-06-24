const validate = (data) => {
  const errors = {};
  if (!data.clientName) {
    errors.clientName = "Client Name is required";
  }
  if (!data.projectName) {
    errors.projectName = "Project Name is required";
  } else if (data.projectName.length <= 3) {
    errors.projectName = "Project Name needs to be greater than 3";
  }
  if (!data.projectType) {
    errors.projectType = "Project Type is required";
  } else if (data.projectType.length <= 3) {
    errors.projectType = "Project Type needs to be greater than 3";
  }
  if (!data.review) {
    errors.review = "Review is required";
  } else if (data.text.review <= 13) {
    errors.text = "Text needs to be greater than 13";
  }
  if (data.rating.length <= 1) {
    errors.rating = "Ratings need to be greater than 1.0";
  } 
  return errors;
};
export default validate;
