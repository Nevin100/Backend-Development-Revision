// Function that returns a Promise to divide two numbers
function divide(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject(new Error("Division by zero"));
    } else {
      resolve(a / b);
    }
  });
}

// Example usage:
divide(10, 2)
  .then((result) => {
    console.log("Result:", result);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
