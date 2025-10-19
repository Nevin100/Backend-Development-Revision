// event emitter : A simple example of using Node.js EventEmitter. It is used to handle events in an asynchronous way.

const EventEmitter = require("events");

const emitter = new EventEmitter();

// Register an event listener for 'greet' event
emitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

// Emit the 'greet' event
emitter.emit("greet", "Alice");
