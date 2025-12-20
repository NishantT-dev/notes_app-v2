const errorHandler=(err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    res.status(statusCode).json({
        succes:false,
        message:err.message || "Server error or Status code 500"
    });
    };
export default errorHandler;