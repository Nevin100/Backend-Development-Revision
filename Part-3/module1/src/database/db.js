import dotenv from 'dotenv';
import {Pool} from "pg";

dotenv.config();

// Create a new pool to manage database connections
const pool = new Pool({
    connectionString : process.env.DATABASE_URL
})

// Query Function to execute SQL queries against the database
async function query(text, params){
    const start = Date.now();
    try{
        const result = await pool.query(text, params);

        const duration = Date.now() - start;
        console.log(`Executed query in ${duration}ms: ${text}`);
        return result;
    }catch(error){
        console.log(`Error :`, error);
        throw error;
    }finally{
        console.log("completed")
    }
}

export {query}