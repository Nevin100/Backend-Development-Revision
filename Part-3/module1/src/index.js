import dotenv from 'dotenv';

dotenv.config();

import {createUserTable} from "./concepts/queries.js";

async function textbasicQueries(){
    try{
        await createUserTable();
    }catch(error){
        console.error("Error in textbasicQueries:", error);
    }
}

async function main(){
    await textbasicQueries();
}

main();