// Buffer : Node.js provides a built-in module called 'buffer' that allows you to work with binary data directly. Buffers are used to handle raw binary data in various scenarios, such as reading from files, network streams, or manipulating binary data.

// Creating a Buffer : You can create a Buffer using the Buffer.from(), Buffer.alloc(), or Buffer.allocUnsafe() methods.

// Example to demonstrate Buffer usage in Node.js :

const Buff1 = Buffer.from('Hello, World!'); // Creating a Buffer from a string
console.log('Buffer from string:', Buff1);

const Buff2 = Buffer.alloc(10); // Creating a Buffer of size 10 bytes, initialized with zeros
console.log('Allocated Buffer of size 10:', Buff2);

const Buff3 = Buffer.allocUnsafe(10); // Creating a Buffer of size 10 bytes, uninitialized (may contain old data)
console.log('Uninitialized Buffer of size 10:', Buff3);

const Buff4 = Buffer.from([1, 2, 3, 4, 5]); // Creating a Buffer from an array of bytes
console.log('Buffer from byte array:', Buff4);

// Writing to a Buffer
Buff2.write('Node.js');
console.log('Buffer after writing "Node.js":', Buff2); // Note: Only first 7 bytes will be written

// Reading from a Buffer
const str = Buff1.toString('utf-8');
console.log('String read from Buffer:', str); // Output: Hello, World!

// Concatenating Buffers
const Buff5 = Buffer.concat([Buff1, Buff4]);
console.log('Concatenated Buffer:', Buff5);
console.log('String from Concatenated Buffer:', Buff5.toString('utf-8')); // Output: Hello, World 

// Slicing a Buffer
const Buff6 = Buff1.slice(0, 5);
console.log('Sliced Buffer (first 5 bytes):', Buff6.toString('utf-8')); // Output: Hello

// Expected Output:
// Buffer from string: <Buffer 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21>
// Allocated Buffer of size 10: <Buffer 00 00 00 00 00 00 00 00 00 00>
// Uninitialized Buffer of size 10: <Buffer ...> (may contain old data)
// Buffer from byte array: <Buffer 01 02 03 04 05>
// Buffer after writing "Node.js": <Buffer 4e 6f 64 65 2e 6a 73 00 00 00>
// String read from Buffer: Hello, World!
// Concatenated Buffer: <Buffer 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21 01 02 03 04 05>
// String from Concatenated Buffer: Hello, World !
// Sliced Buffer (first 5 bytes): Hello