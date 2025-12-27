import express from "express";
import path from "path";

// Create an Express application
const app = express();
const __dirname = path.resolve();

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Set the Views directory
app.set("views", path.join(__dirname, "views"));

// Demo Data :
const products = [
  { id: 1, name: "Product A", price: 100 },
  { id: 2, name: "Product B", price: 150 },
  { id: 3, name: "Product C", price: 200 },
];

app.get("/", (req, res) => {
  // Render the index.ejs template and pass the products data
  res.render("home", { title: "Product List", products });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
