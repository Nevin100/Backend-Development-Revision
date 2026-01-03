// Apollo Server Setup
import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {typeDefs} from "./graphql/schema.js";
import resolvers from "./graphql/resolvers.js";

// Start the server
async function startServer() {
    const server = new ApolloServer({   
        typeDefs,
        resolvers,
    }); 
    // Launch the server
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`Server is running at ${url}`);
}

// Invoke the function to start the server
startServer();