// Custom Error Handling Middleware : 
// Define a custom error class for API errors

class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'APIError';
    }
}

// Async Handler Middleware to catch errors in async functions
const asynchandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };  
};

// Global Error Handling Middleware
const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if(err instanceof APIError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }
}

export { APIError, asynchandler, globalErrorHandler };