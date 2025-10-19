function randomSimpleCallback(a, functioncall) {
  // Logging the first line with the provided argument
  console.log(`Hello, This is the first line and also heyyyyyyyyyyy ${a}`);
  // Invoking the callback function with two numbers
  const result = functioncall(5, 10);
  console.log(`The result of the callback function is: ${result}`);
}

// Defining a simple callback function that adds two numbers
function Add(c, b) {
  return c + b;
}

// Calling the main function with a string and the Add callback function
randomSimpleCallback("Nevin", Add);
