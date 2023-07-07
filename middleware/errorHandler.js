const { errorCodes } = require("../constants");


const errorHandler = (err, req, res, next) => {
    
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch(statusCode) {
        case errorCodes.VALIDATION_ERROR:
            res.json({
                title: `Validation failed!`,
                message:err.message,
                stackTrace: err.stack
            });
            break;
        case errorCodes.UNAUTHORIZED:
            res.json({
                title: `Unauthorized user!`,
                message:err.message,
                stackTrace: err.stack
            });
            break;
        case errorCodes.FORBIDDEN:
            res.json({
                title: `Access forbidden!`,
                message:err.message,
                stackTrace: err.stack
            });
            break;
        case errorCodes.NOT_FOUND:
            res.json({
                title: `Not found!`,
                message:err.message,
                stackTrace: err.stack
            });
            break;
        case errorCodes.SERVER_ERROR:
            res.json({
                title: `Internal server error!`,
                message:err.message,
                stackTrace: err.stack
            });
            break;
        default:
            break;
    }


    res.status(statusCode).json({error: err.message});
}

module.exports = {errorHandler};