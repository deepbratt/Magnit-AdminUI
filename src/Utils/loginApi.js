import axios from "axios";

const BASE_URL = "https://api.themagnit.com/v1";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    'Authorization' : "Bearer "+localStorage.getItem('jwt')
  },
});
const axiosFormInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    'Content-Type': 'multipart/form-data',
    "Access-Control-Allow-Origin": "*",
    'Authorization' : "Bearer "+localStorage.getItem('jwt')
  },
});

const USERS = {
  LOGIN: `users/login`,
  FORGOTPASS: `users/forgotPassword`,
  RESETPASS: `users/resetPassword`,
};

const apiEndpoints={
  howItWorks:"howitworks",
  caseStudies:"casestudies",
  FAQs:"faqs",
  blogs:"blogs",
  seoText:'seoText'
}

export const userLoginApi = async (data) => {
  try {
    let result = await axiosInstance.post(`${USERS.LOGIN}`, data);
    localStorage.setItem('jwt', result.data.token)
    console.log(result)
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const forgotPasswordApi = async (data) => {
  try {
    let result = await axiosInstance.post(`${USERS.FORGOTPASS}`, data);

    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

export const resetPasswordApi = async (token, data) => {
  try {
    let result = await axiosInstance.patch(`${USERS.RESETPASS}/${token}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
    if (error.response === undefined) {
      return { status: 403, message: "Something Went Wrong!" };
    }
    return error.response.data;
  }
};

// how it works
export const getAllHowItWorks = async()=>{
  try{
      const response = await axiosInstance.get(apiEndpoints.howItWorks)
      console.log(response)
      return response
  }catch(error){
      console.log('error: ',error)
      return error
  }
}

export const getOneHowItWorks = async(itemId)=>{
  try{
      const response = await axiosInstance.get(apiEndpoints.howItWorks+"/"+itemId)
      console.log(response)
      return response
  }catch(error){
      console.log('error: ',error)
      return error
  }
}
export const deleteHowItWorks = async(itemId)=>{
  try{
      const response = await axiosInstance.delete(apiEndpoints.howItWorks+"/"+itemId)
      console.log(response)
      return  response
  }catch(error){
      console.log('error: ',error)
      return  error
  }
}
export const updateHowItWorks = async(itemId, dataBody)=>{
  try{
      const response = await axiosFormInstance.patch(apiEndpoints.howItWorks+"/"+itemId, dataBody)
      console.log(response)
      return  response
  }catch(error){
      console.log('error: ',error)
      return  error
  }
}
export const createHowItWorks = async(dataBody)=>{
    try{
        const response = await axiosFormInstance.post(apiEndpoints.howItWorks+"/", dataBody)
        console.log(response)
        return  response
    }catch(error){
        console.log('error: ',error)
        return  error
    }
}


// Case Studies

export const getAllCaseStudies = async()=>{
  try{
      const response = await axiosInstance.get(apiEndpoints.caseStudies)
      console.log(response)
      return response
  }catch(error){
      console.log('error: ',error)
      return error
  }
}

export const getOneCaseStudies = async(itemId)=>{
  try{
      const response = await axiosInstance.get(apiEndpoints.caseStudies+"/"+itemId)
      console.log(response)
      return response
  }catch(error){
      console.log('error: ',error)
      return error
  }
}
export const deleteCaseStudies = async(itemId)=>{
  try{
      const response = await axiosInstance.delete(apiEndpoints.caseStudies+"/"+itemId)
      console.log(response)
      return  response
  }catch(error){
      console.log('error: ',error)
      return  error
  }
}
export const updateCaseStudies = async(itemId, dataBody)=>{
  try{
      const response = await axiosFormInstance.patch(apiEndpoints.caseStudies+"/"+itemId, dataBody)
      console.log(response)
      return  response
  }catch(error){
      console.log('error: ',error)
      return  error
  }
}
export const createCaseStudies = async(dataBody)=>{
    try{
        const response = await axiosFormInstance.post(apiEndpoints.caseStudies+"/", dataBody)
        console.log(response)
        return  response
    }catch(error){
        console.log('error: ',error)
        return  error
    }
}


// FAQs

export const getAllFAQs = async()=>{
  try{
      const response = await axiosInstance.get(apiEndpoints.FAQs)
      console.log(response)
      return response
  }catch(error){
      console.log('error: ',error)
      return error
  }
}

export const getOneFAQs = async(itemId)=>{
  try{
      const response = await axiosInstance.get(apiEndpoints.FAQs+"/"+itemId)
      console.log(response)
      return response
  }catch(error){
      console.log('error: ',error)
      return error
  }
}
export const deleteFAQs = async(itemId)=>{
  try{
      const response = await axiosInstance.delete(apiEndpoints.FAQs+"/"+itemId)
      console.log(response)
      return  response
  }catch(error){
      console.log('error: ',error)
      return  error
  }
}
export const updateFAQs = async(itemId, dataBody)=>{
  try{
      const response = await axiosInstance.patch(apiEndpoints.FAQs+"/"+itemId, dataBody)
      console.log(response)
      return  response
  }catch(error){
      console.log('error: ',error)
      return  error
  }
}
export const createFAQs = async(dataBody)=>{
    try{
        const response = await axiosInstance.post(apiEndpoints.FAQs+"/", dataBody)
        console.log(response)
        return  response
    }catch(error){
        console.log('error: ',error)
        return  error
    }
}

// blogs

export const getAllBlogs = async()=>{
  try{
      const response = await axiosInstance.get(apiEndpoints.blogs)
      console.log(response)
      return response
  }catch(error){
      console.log('error: ',error)
      return error
  }
}

export const createBlog = async(dataBody)=>{
  try{
    let token  =  await fetchJwt()
    let headers = {
      Accept: "application/json",
      'Content-Type': 'multipart/form-data',
      "Access-Control-Allow-Origin": "*",
      'Authorization' : "Bearer "+token
    }
      const response = await axiosFormInstance.post(apiEndpoints.blogs+"/", dataBody, {headers: headers})
      console.log(response)
      return  response
  }catch(error){
      console.log('error: ',error)
      return  error
  }
}

export const updateBlog = async(itemId, dataBody)=>{
  try{
    let token  =  await fetchJwt()
    let headers = {
      Accept: "application/json",
      'Content-Type': 'multipart/form-data',
      "Access-Control-Allow-Origin": "*",
      'Authorization' : "Bearer "+token
    }
      const response = await axiosFormInstance.patch(apiEndpoints.blogs+"/"+itemId, dataBody, {headers:headers})
      console.log(response)
      return  response
  }catch(error){
      console.log('error: ',error)
      return  error
  }
}

export const deleteBlog = async(itemId)=>{
  try{
      const response = await axiosInstance.delete(apiEndpoints.blogs+"/"+itemId)
      console.log(response)
      return  response
  }catch(error){
      console.log('error: ',error)
      return  error
  }
}

async function fetchJwt(){
  let token = undefined
  token  =  localStorage.getItem('jwt')
  if(token!==undefined){
    return token
  }
}

export const getOneBlog = async(itemId)=>{
  try{
    let token  =  await fetchJwt()
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      'Authorization' : "Bearer "+token
    }
      const response = await axios.get(BASE_URL+"/"+apiEndpoints.blogs+"/"+itemId, {headers: headers})
      console.log(response)
        return response
  }catch(error){
      console.log('error: ',error)
      return error
  }
}

// seoText
export const getAllSeoText = async() =>{
  try{
    const response = await axiosInstance.get(apiEndpoints.seoText)
    console.log(response)
    return response
  }catch(error){
    console.log("error: ", error)
    return error
  }
}
export const getOneSeoText = async(itemId) =>{
  try{
    const response = await axiosInstance.get(apiEndpoints.seoText+'/'+itemId)
    console.log(response)
    return response
  }catch(error){
    console.log("error: ", error)
    return error
  }
}

export const updateSeoText = async(itemId, dataBody) =>{
  try{
    const response = await axiosInstance.patch(apiEndpoints.seoText+'/'+itemId, dataBody)
    console.log(response)
    return response
  }catch(error){
    console.log("error: ", error)
    return error
  }
}

export const createSeoText = async(dataBody) =>{
  try{
    const response = await axiosInstance.post(apiEndpoints.seoText, dataBody)
    console.log(response)
    return response
  }catch(error){
    console.log("error: ", error)
    return error
  }
}

export const deleteSeoText = async(itemId) =>{
  try{
    const response = await axiosInstance.delete(apiEndpoints.seoText+'/'+itemId)
    console.log(response)
    return response
  }catch(error){
    console.log("error: ", error)
    return error
  }
}