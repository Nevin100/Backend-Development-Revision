import {query} from "../database/db.js";

export async function createUserTable(){
    try{
        const createTableQuery =
        `
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                userName VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(25) UNIQUE NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )   
        `;

        await query(createTableQuery);
        console.log("Table Created Successfully")
    }catch(error){
        console.log(`Error occured : `, error);
    }
}