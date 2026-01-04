import rateLimit from 'express-rate-limit';

// Function to create a rate limiting middleware
const createRateLimiter = (maxRequests, time) =>{
    return rateLimit({
        // WindowMs : It specifies the time frame for which requests are checked/remembered
        windowMs: time,

        // max : It specifies the maximum number of requests allowed within the windowMs time frame
        max: maxRequests, 

        // message : Response sent when the rate limit is exceeded
        message:"Too many request, please try agaion later",

        //standardHeaders: It enables the sending of rate limit info in the `RateLimit-*` headers
        standardHeaders: true,
        
        //legacyHeaders: It disables the `X-RateLimit-*` headers
        legacyHeaders: false,
    });
}

export default createRateLimiter;