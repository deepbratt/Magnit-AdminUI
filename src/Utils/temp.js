export const getAllCaseStudies = async()=>{
    try{
        const response = await axiosInstance.get(caseStudiesaseStudies)
        console.log(response)
        return response
    }catch(error){
        console.log('error: ',error)
        return error
    }
  }
  
  export const getOneCaseStudies = async(itemId)=>{
    try{
        const response = await axiosInstance.get(caseStudiesaseStudies+"/"+itemId)
        console.log(response)
        return response
    }catch(error){
        console.log('error: ',error)
        return error
    }
  }
  export const deleteCaseStudies = async(itemId)=>{
    try{
        const response = await axiosInstance.delete(caseStudiesaseStudies+"/"+itemId)
        console.log(response)
        return  response
    }catch(error){
        console.log('error: ',error)
        return  error
    }
  }
  export const updateCaseStudies = async(itemId, dataBody)=>{
    try{
        const response = await axiosFormInstance.patch(caseStudiesaseStudies+"/"+itemId, dataBody)
        console.log(response)
        return  response
    }catch(error){
        console.log('error: ',error)
        return  error
    }
  }
  export const createCaseStudies = async(dataBody)=>{
      try{
          const response = await axiosFormInstance.post(caseStudiesaseStudies+"/", dataBody)
          console.log(response)
          return  response
      }catch(error){
          console.log('error: ',error)
          return  error
      }
  }