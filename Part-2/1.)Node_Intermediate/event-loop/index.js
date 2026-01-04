// Event Loop in Javascript : 
// -> 1. Call Stack
// -> 2. Web APIs
// -> 3. Callback Queue
// -> 4. Event Loop

// Complete Explanation of Event Loop :
// 1. Call Stack : It is a data structure that keeps track of the function calls in a program.
// 2. Web APIs : These are APIs provided by the browser or Node.js that allow us to perform asynchronous operations.
// 3. Callback Queue : It is a queue that holds the callback functions that are ready to be executed.
// 4. Event Loop : It is a mechanism that continuously checks the Call Stack and the Callback Queue. If the Call Stack is empty, it takes the first callback from the Callback Queue and pushes it onto the Call Stack for execution.

// Event Loop Phases in Node.js :
// timers : setTimeout, setInterval
// pending Call backs : (microtask queue) and then (macrotask queue)
// idle , prepare
// polling -> I/O operations where callbacks are executed
// check : setImmediate -> macrotask queue
// close callbacks : socket.on('close', ...) , etc.
// I/O operations : fs.readFile, network requests
// CPU intensive task : crypto.pbkdf2, etc.

// Example to demonstrate Event Loop :

const fs = require('fs');
const crypto = require('crypto');

console.log('1. Start');

// setTimeout with 0ms delay
setTimeout(() => {
    console.log('2. setTimeout Callback 0s (macrotask)');
},0);

// setTimeout with 0ms delay
setTimeout(() => {
    console.log('3. setTimeout Callback 0s (macrotask)');
},0);

// setImmediate : Sets a callback to be executed in the check phase
setImmediate(() => {
    console.log('4. setImmediate Callback (check)');
},0);

// Promise.resolve().then() : Adds a callback to the microtask queue
Promise.resolve().then(() => {
    console.log('5. Promise Callback (microtask)'); 
});

// process.nextTick() : Adds a callback to the microtask queue
process.nextTick(() => {
    console.log('6. process.nextTick Callback (microtask)');
});

// fs.readFile : I/O operation
fs.readFile(__filename, () => {
    console.log('7. fs.readFile Callback (I/O operation)');
});

// crypto.pbkdf2 : CPU intensive task -> here we are simulating a CPU intensive task
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', () => {
    console.log('8. crypto.pbkdf2 Callback (CPU intensive task)');
});

// Synchronous log
console.log('9. Scripts End');

// expected output order :
// 1. Start    
// 9. Scripts End
// 6. process.nextTick Callback (microtask)
// 5. Promise Callback (microtask)
// 2. setTimeout Callback 0s (macrotask)
// 3. setTimeout Callback 0s (macrotask)
// 4. setImmediate Callback
// 7. fs.readFile Callback (I/O operation)
// 8. crypto.pbkdf2 Callback (CPU intensive task)
