import ClientError from "../error/client-error.js";

const ErrorMiddleware = (err,req,res,next) =>{
    if(!err){
        next();
        return;
    }
    let code = null;
    let message = null;
    if(err instanceof ClientError){
        code = err.statusCode;
        message = err.message;
    }else {
        code = 500;
        message = 'Internal Server Error';
        message = err.message;
    }
    return res.status(code).json({
        status : 'fail',
        message :  message,
    });
};

export default ErrorMiddleware;