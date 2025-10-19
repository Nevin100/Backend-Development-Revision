// A simple function that returns a Promise which resolves after a specified time delay
function delayfn(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// Example usage:
console.log("Starting delay...");

// Call the delay function with a 2-second delay
delayfn(2000).then(() => {
  console.log("Delay of 2 seconds finished.");
});

// This log will appear before the delay finishes
console.log("This will log before the delay finishes.");
