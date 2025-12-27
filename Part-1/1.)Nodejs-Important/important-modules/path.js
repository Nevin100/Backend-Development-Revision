const path = require("path");

console.log("Path module loaded:", path.basename(__filename));

console.log("Directory name:", path.dirname(__filename));

console.log("File extension:", path.extname(__filename));

// Join Paths
const joinedPath = path.join(__dirname, "subdir", "file.txt");
console.log("Joined Path:", joinedPath);

//resolve Paths
const resolvedPath = path.resolve("subdir", "file.txt");
console.log("Resolved Path:", resolvedPath);
