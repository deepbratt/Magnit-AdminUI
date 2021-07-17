export const isResponseSuccess = (response) => {
  if (response && response.data && response.data.status === "success") {
    return true;
  }
  return false;
};
export const isUnauthorized = (response) => {
  if (response.response.status === 401) {
    return true;
  }
  return false;
};
