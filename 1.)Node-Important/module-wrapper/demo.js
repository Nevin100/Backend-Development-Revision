// Structure of Module Wrapper
// (function (exports, require, module, filename, dirname) {
//   console.log("Module Wrapper Example");
// });

const firstModule = require("./explorer.js");

console.log("Module Demo Example");

console.log(
  "This code is inside the wrapper-demo module -> filename.",
  __filename
);
console.log(
  "This code is inside the wrapper-demo module -> dirname.",
  __dirname
);

firstModule.greet("Nevin Bali");
