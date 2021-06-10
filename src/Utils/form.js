export const fieldName={
    email:"email",
    password:"password",
    newPassword:"newPassword",
    confirmPassword:"confirmPassword",
     rememberMe:"rememberMe"  
}

export const labelsText = {
email: "Email",
password:"Password",
rememberMe:"Remember me",
newPassword:"New Password",
confirmPassword:'Confirm Password',
signin:"Sign In",
submit:"Submit"
};
export const messages = {
    isRequired: "This field is required.",
    notValid: "Input value is not Valid",
    paswordLength: "Password should be greater than 6 characters"
    // paswordLength: "Password should be greater than 6 characters"
  };
const regEmail =
   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const regTypeName = /^(?=.{0,40}$)[a-zA-Z '.-]*$/;
   const regPassword="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.]{6, 20}/";
   export const isTypeAlphaSpace=(name)=>{
    return regTypeName.test(name)
   }
   export const isTypePassword=(password)=>{
       return regPassword.test(password)
   }
export const isEmailValid=(email)=>{
    return regEmail.test(email)
   }
   export const EMAIL_REGEX = {
    regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    regexMessage: "Invalid email address!"
  };
     // set the token and user from the session storage
export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);

    sessionStorage.setItem('user', JSON.stringify(user));
  }
// return the user data from the session storage
   export const getUser =()=>{
       const useStr=sessionStorage.getItem('user');
       if (useStr) 
       return JSON.parse(useStr);
       else 
       return null;
   }
   // return the token from the session storage
   export const getToken=()=>{
       return sessionStorage.getItem('token') || null
   }
   // remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
