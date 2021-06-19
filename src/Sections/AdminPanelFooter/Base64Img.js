import { useState } from "react";



const Base64Img = () =>{
    const [fbfile, setfbFile] = useState({
        file: null,
        base64URL: ""
      })
    
    
      const getBase64 = file => {
        return new Promise(resolve => {

          let baseURL = "";
          let reader = new FileReader();
    
          reader.readAsDataURL(file);
    
          reader.onload = () => {
            
            baseURL = reader.result;
            resolve(baseURL);
          };
        });
      };
    
      const fileChange = e => {
    
    
    const file = e.target.files[0];
    
        getBase64(file)
          .then(result => {
            file["base64"] = result;
            setfbFile({
              base64URL: result,
              file
            });
          })
          .catch(err => {
            console.log(err);
          });
    
        setfbFile({
          file: e.target.files[0]
        });
      };
      return{fbfile,fileChange}
}


export default Base64Img