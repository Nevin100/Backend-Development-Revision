import dotenv from 'dotenv';
import express from 'express';
import corsConfig from './Config/corsConfig.js';
import {requestLogger ,addTimeStamp} from './Middleware/custom.js';
import globalErrorHandler from './Middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware :
//Custom middleware functions
app.use(requestLogger);
app.use(addTimeStamp);

//CORS Configuration
app.use(corsConfig());
app.use(express.json());

//Global error handling middleware
app.use(globalErrorHandler);

// Starting the server
app.listen(process.env.PORT || PORT, () => {    
    console.log(`Server is running on port ${process.env.PORT}`);
});