import express from "express";
import myMiddleware from "./middleware.js";

// Initialize the app :
const app = express();
const PORT = 3000;

// Root Route with Middleware :
app.get("/", myMiddleware, (req, res) => {
  res.send("Hello, World!");
});

// Start the server :
app.listen(PORT || 3000, () => {
  console.log(`The server is running on port ${PORT}`);
});
