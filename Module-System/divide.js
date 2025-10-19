// Arithmetic Functions :

function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return a / b;
}

function add(a, b) {
  return a + b;
}

// with try-catch block
const modulous = (a, b) => {
  try {
    if (b == 0) {
      throw new Error("Modulous by zero is not allowed.");
    }
    return a % b;
  } catch (error) {
    console.log("Error in modulous function:", error.message);
  }
};

module.exports = { divide, modulous, add };
