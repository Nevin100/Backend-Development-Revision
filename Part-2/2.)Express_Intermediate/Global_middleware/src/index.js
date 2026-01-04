import dotenv from 'dotenv';
import express from 'express';
import {corsConfig} from './Config/cors.config.js';
import {requestLogger ,addTimeStamp} from './Middleware/custom.js';
import {globalErrorHandler} from './Middleware/error.handler.js';
import createRateLimiter from "./Middleware/rate-limiting.js";
import testRoutes from './Route/test.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware :
//Custom middleware functions
app.use(requestLogger);
app.use(addTimeStamp);

//CORS Configuration
app.use(corsConfig());

// Rate Limiting Middleware
app.use(createRateLimiter(100, 15 * 60 * 1000)); // 100 requests per 15 minutes
app.use(express.json());


//Importing and using routes
app.use('/api/v1', testRoutes);

//Global error handling middleware
app.use(globalErrorHandler);

// Starting the server
app.listen(process.env.PORT || PORT, () => {    
    console.log(`Server is running on port ${process.env.PORT}`);
});