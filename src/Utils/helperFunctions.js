export const isResponseSuccess = (response) =>{
    if(response && response.data && response.data.status==="success"){
        return true
    }
    return false
}