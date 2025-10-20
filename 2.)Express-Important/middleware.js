import expres from "express";

const app = expres();

// Middleware :

const myMiddleware = (req, res, next) => {
  console.log("This middlware will run every time");
  next();
};

export default myMiddleware;
