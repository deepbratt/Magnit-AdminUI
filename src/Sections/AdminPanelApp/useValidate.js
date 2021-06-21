const validate = (data) => {

   const errors = {};
   if (!data.description) {
       errors.description = 'Description is required';
   }else if (
    data.description.length<13
) {
    errors.description = 'Description needs to be greater than 13';
}
   return errors;
 }
 export default validate;

