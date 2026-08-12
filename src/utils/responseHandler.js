const handleSuccess = (res , message="Success" , data={} , statusCode=200) => {
return res.status(statusCode).json({
    success: true,
    message,
    data,
    statusCode
 })
}




const handleError =( res , message="Something wwnt wrong" , data , statusCode=500) => {
   return res.status(statusCode).json({
    success: false,
    message,
    statusCode
 }) 
}

export {handleSuccess , handleError}