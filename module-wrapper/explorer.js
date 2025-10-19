// Structure of Module Wrapper
// (function (exports, require, module, filename, dirname) {
//   console.log("Module Wrapper Example");
// });

console.log("Module Wrapper Example");

console.log(
  "This code is inside the wrapper-explorer module -> filename.",
  __filename
);
console.log(
  "This code is inside the wrapper-explorer module -> dirname.",
  __dirname
);

module.exports.greet = function (name) {
  console.log(`Hello, ${name}!`);
};
