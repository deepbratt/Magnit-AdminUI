const validate = (data) => {

   const errors = {};
   if (!data.clientName) {
       errors.clientName = 'ClientName is required';
   }

   if(!data.link){
       errors.link = 'Link is required'
   }
   return errors;
 }
 export default validate;
