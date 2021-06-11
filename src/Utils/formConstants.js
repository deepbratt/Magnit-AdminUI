export const messages = {
  isRequired: "This field is required.",
  notValid: "Input value is not Valid",
  projectDetailValidationMessage:
    "Project details should be greater than 30 characters",
  companyNameLength: "Company Name should be greater than 3 characters",
};

export const fieldNames = {
  email: "email",
  password: "password",
};

export const regex = {
  email: /$^|.+@.+..+/,
};

const regName = /^(?=.{3,40}$)[a-zA-Z]+(?:[-'. ][a-zA-Z]+)*$/;
const regTypeName = /^(?=.{0,40}$)[a-zA-Z '.-]*$/;
// const regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const regPhone =
  /^[+]?[0-9]{1}[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}[-\s.]?[0-9]{3,6}$/;
const regTypePhone = /^[+0-9 ]*$/;
const regEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isNameValid = (name) => {
  return regName.test(name);
};
export const isTypeAlphaSpace = (name) => {
  return regTypeName.test(name);
};
export const isPhoneValid = (phone) => {
  return regPhone.test(phone);
};
export const isTypeNumPlusBracket = (phone) => {
  return regTypePhone.test(phone);
};
export const isEmailValid = (email) => {
  return regEmail.test(email);
};
