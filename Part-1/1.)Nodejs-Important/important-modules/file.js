const path = require("path");
const fs = require("fs");

// Create 'data' folder if it doesn't exist
const datafolder = path.join(__dirname, "data");

if (!fs.existsSync(datafolder)) {
  fs.mkdirSync(datafolder);
  console.log("Data Folder created successfully");
}

// Create 'info.txt' file inside 'data' folder if it doesn't exist
const filePath = path.join(datafolder, "info.txt");

// Synchronously create, append, reading file
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(
    filePath,
    "This is the first line of information of this newly created file"
  );
}

fs.appendFileSync(
  filePath,
  "\nThis is the second line of information added to the file."
);
console.log("File Appended successfully.");

const contenstFile = fs.readFileSync(filePath, "utf-8");
console.log("Cointents of file : \n", contenstFile);

// Asynchronous way to read file
fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("Asynchronous read: \n", data);
});

fs.writeFile(filePath, "Overwriting the file with new content.", (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("File overwritten successfully.");
});
