import cors from "cors";

// CORS : Cross-Origin Resource Sharing is a security feature implemented by web browsers to restrict web applications running on one origin (domain) from accessing resources on a different origin.

// This configuration allows you to specify which origins are permitted to access your server's resources.

// CORS Configuration :
export const corsConfig = () =>{
    return cors({
        
        // Origin : it specifies which origins are allowed to access the resources
        origin : (origin, callback) => {
            const allowedOrigins = ['http://localhost:3000', 'http://example.com'];

        // Check if the incoming request's origin is in the allowed origins list
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            // Allow the request
            callback(null, true);
        } else {
            // Block the request
            callback(new Error('Not allowed by CORS')); 
        }},

        // Methods : it specifies which HTTP methods are allowed for cross-origin requests
        methods : ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods

        //Allowed Headers : it specifies which headers can be used in the actual request.
        //(Headers are key-value pairs sent in HTTP requests to provide additional information about the request or the client making the request.)
        // 1.) Content-Type : it indicates the media type of the resource being sent to the server.
        // 2.) Authorization : it is used to send credentials (like tokens) to authenticate the client.
        // 3.) Accept-Version : it indicates the version of the API that the client is expecting.
        allowedHeaders : ['Content-Type', 'Authorization', 'Accept-Version'], 

        // exposed Headers : it specifies which headers can be exposed to the client in the response.
        // 1.) Content Range : it indicates the range of bytes being sent in the response, useful for pagination.
        // 2.) X-Total-Count : it indicates the total number of items available on the server, useful for pagination. etc..
        exposedHeaders : ['Content-Range', 'X-Total-Count'],

        // Credentials : it indicates whether or not the response to the request can be exposed when the credentials flag is true.
        credentials : true, // Allow cookies and authentication information to be sent with requests
        
        //(preflight controls how the server responds to preflight requests made by browsers to check if the actual request is safe to send.)
        // preflightContinue : it indicates whether to pass the CORS preflight response to the next handler.
        preflightContinue : false, // Disable preflight requests
        
        //maxAge : it specifies how long the results of a preflight request can be cached by the client.
        maxAge : 86400, // Cache preflight response for 24 hours (in seconds) -> avoids repeated preflight requests
        
        // optionsSuccessStatus : it specifies the status code to be sent for successful OPTIONS requests.
        optionsSuccessStatus : 200 // Some legacy browsers (e.g., IE11) choke on 204
    });
}