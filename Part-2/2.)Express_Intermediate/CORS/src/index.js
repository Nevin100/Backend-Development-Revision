import dotenv from 'dotenv';
import express from 'express';
import corsConfig from './cors.config/corsConfig.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware :
//CORS Configuration
app.use(corsConfig());
app.use(express.json());

// Starting the server
app.listen(process.env.PORT || PORT, () => {    
    console.log(`Server is running on port ${process.env.PORT}`);
});