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
      const response = await axiosFormInstance.patch(apiEndpoints.FAQs+"/"+itemId, dataBody)
      console.log(response)
      return  response
  }catch(error){
      console.log('error: ',error)
      return  error
  }
}
export const createFAQs = async(dataBody)=>{
    try{
        const response = await axiosFormInstance.post(apiEndpoints.FAQs+"/", dataBody)
        console.log(response)
        return  response
    }catch(error){
        console.log('error: ',error)
        return  error
    }
}

const data = {
  image: [file],
  textIcon: [
    {
      icon: [file], 
      text: "",
      title: "",
    },
    {
      icon: [file],
      text: "",
      title: "",
    },
    {
      icon: [file],
      text: "",
      title: "",
    },
  ],
};

databody = {
  locations: {
    heading: "",
    dataArray: [
      { officeType: "Head Office", address: "------------" },
      { officeType: "Regional Office", address: "------------" },
      { officeType: "Regional Office", address: "------------" },
    ],
  },
  contcatUs: {
    heading: "talk to us",
    dataArray: [
      { country: "USA", number: "0 9876554 3323" },
      { country: "India", number: "0 9876554 3323" },
      { country: "Pakistan", number: "0 9876554 3323" },
    ],
  },
  socialMedia: {
    heading: "",
    dataArray: [
      { title: "facebook", link: "fb.com", icon: "" },
      { title: "instagram", link: "insta.com", icon: "" },
      { title: "linkedin", link: "linkedin.com", icon: "" },
      { title: "github", link: "github.com", icon: "" },
    ],
  },
};

const pages={
    banner:{queryParams:"_id=7887877887"},
    services:{queryparams:"type=web-development"},
}

services = {
    title:"",
    text:"",
    image:"",
    labelBtn:"",
    linkBtn:"",
    page:"digital marketing",
}


// form

// decode => s3 bucket
//   fd = new FormData()
//   fd.append('image', fileImage)
//   fd.append('dataArray', arrayOfdata)
//   fd.append('title', fileImage)

// dataTemp = {
//     image:"",
//     text:"",
//     title:"PPC",
      // type:"main"
// }

// admin

// baseurl/getallservices?type=main

/*
databady={
  metaData:{},
sections:{
  banner:{id:"", order:2},
  services:{type:"main", title:"", subtitle:"", order:1},
  reviews:{limit:"4"},
  benefits:{type:"jobs"}
}
}



data.section
<Section
*/




// website

// baseurl.com/home-page

/* result :{
  banner:{},
  services:{},
  reviews:{},
  benefits:{},
}
*/

// baseurl.com/page?servicePage=2&servicelimit=6&reviewsPage=3&reviewsLimit=4
/* result :{
  services:{},
  reviews:{},
}

// baseurl.com/section/test?page=1&skip=5
data.concat(response)
response={
  metadata:{canonical},
  sections:{
    banner:{heading,subheading, image},
    tesmonial:[

    ]
  }
}

baseurl.com/home-page
/banner
/services
/reviews
/beneifits

10-12 call

2nd 3rd
5 calls

*/
