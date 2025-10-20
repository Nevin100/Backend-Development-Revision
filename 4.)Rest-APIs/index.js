import express from "express";

// initialize express app :
const app = express();

// Middleware to parse JSON bodies :
app.use(express.json());

// Sample in-memory data store :
let items = [
  { id: 1, name: "Item One" },
  { id: 2, name: "Item Two" },
];

// 1.) GET Requests :
//a)  Get All Items :
app.get("/", (req, res) => {
  res.json(items);
});

//b) Get Specific Item by ID :
app.get("/:id", (req, res) => {
  try {
    // Extract ID from request parameters :
    const itemId = parseInt(req.params.id);

    // Find item by ID :
    const item = items.find((i) => i.id === itemId);

    // Check if item exists :
    if (item) {
      res.status(200).json({ message: "Item Found", data: item, error: false });
    }

    // If item not found :
    res.status(404).json({ message: "Item Not Found", error: true });
  } catch (error) {
    console.log("Something went wrong:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 2.) POST Request : Create New Item
app.post("/", (req, res) => {
  try {
    // Extract item data from request body :
    const newItem = req.body;

    // Simple Id Assignment :
    newItem.id = items.length + 1;

    // Pushing new item to the data store :
    items.push(newItem);

    // Responding with success message :
    res.status(201).json({
      message: "Item Created Successfully",
      data: newItem,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server issuse", error: true });
  }
});

//3.) PUT Request : Update Existing Item
app.put("/:id", (req, res) => {
  try {
    // Extract ID from request parameters :
    const itemId = parseInt(req.params.id);

    // Extract updated data from request body :
    const updatedData = req.body;

    // Find index of the item to be updated :
    const itemIndex = items.findIndex((i) => i.id === itemId);

    // Check if item exists :
    if (itemIndex !== -1) {
      // Update item data :
      items[itemIndex] = { id: itemId, ...updatedData };

      // Responding with success message :
      res.status(200).json({
        message: "Item Updated Successfully",
        data: items[itemIndex],
        error: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
});

//4.) DELETE Request : Delete Item
app.delete("/:id", (req, res) => {
  try {
    // Extract ID from request parameters :
    const itemId = parseInt(req.params.id);

    // Find index of the item to be deleted :
    const itemIndex = items.findIndex((i) => i.id === itemId);

    // Check if item exists :
    if (itemIndex !== -1) {
      // Remove item from the data store :
      const deletedItem = items.splice(itemIndex, 1);

      // Responding with success message :
      res.status(200).json({
        message: "Item Deleted Successfully",
        data: deletedItem[0],
        error: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
});

//Start the server :
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
