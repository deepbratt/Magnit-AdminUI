const validate = (addressTitle,numberTitle,linkTitle) => {

   const errors = {};
   if (!addressTitle) {
       errors.addressTitle = 'Title for address field is required';
   }
   if (!numberTitle) {
    errors.numberTitle = 'Title for contact field is required';
}
if (!linkTitle) {
    errors.linkTitle = 'Title for links field is required';
}
   return errors;
 }
 export default validate;

