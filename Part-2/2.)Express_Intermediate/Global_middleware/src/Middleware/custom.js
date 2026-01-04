// Custom Middleware : Here we create a custom middleware to log request details

// Middleware function to log request details :
const requestLogger = (req,res,next) => {
    // toISOString gives a standardized format for the timestamp
    const timeStamp = new Date().toISOString();

    // method : GET, POST, etc.
    const method = req.method;

    // url : requested URL
    const url = req.url;

    // user-agent : information about the client's browser or tool making the request
    const userAgent = req.get('User-Agent');

    // Log the details to the console :
    console.log(`[${timeStamp}] ${method} ${url} - User-Agent: ${userAgent}`);
    next();
}

// Another custom middleware to add a timestamp to the request object
const addTimeStamp = (req,res,next) => {
    const timeStamp = new Date().toISOString();
    req.requestTime = timeStamp;
    next();
}

export default { requestLogger, addTimeStamp };