
// const asyncHandler = () => (fn) => async (req ,res, next)=>{
//    try {
//       await fn(req, res, next)
      
//    } catch (error) {
//       res.status(error.statusCode || 500).json({
//          success:false,
//          message:error.message})
//    }
// }




const asyncHandler = (requestHandler) =>{    //(fn) => async (req ,res, next)=>{
     return (req, res, next)=>{
      Promise.resolve(requestHandler(req, res, next)).catch((err)=>{next(err)})
    }
}




export {asyncHandler}