const http = require("http");

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end("Hello from the createServer of Http module in nodejs \n");
});

// Define the port number
const PORT = 3000;

// Start the server and listen on the specified port
server.listen(PORT || 3000, () => {
  console.log(`Server is running on: http://localhost:${PORT}/`);
});
