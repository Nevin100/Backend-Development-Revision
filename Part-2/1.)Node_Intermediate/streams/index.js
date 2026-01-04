// Streams : Streams are used to handle reading/writing files or exchanging information in an efficient way.

// There are four types of streams in Node.js:
// 1. Readable: Used for reading data.
// 2. Writable: Used for writing data.
// 3. Duplex: Can be used for both reading and writing data. (TCP Sockets)
// 4. Transform: A type of duplex stream where the output is computed based on the input.

// zlib: A module that provides compression functionality using Gzip and Deflate/Inflate algorithms.

const fs = require('fs');
const crypto = require('crypto');
const {Transform} = require('stream');
const zlib = require('zlib');

// Example: Creating a Transform stream for encryption
class EncryptStream extends Transform {
    constructor(key, vector){
    super(); // Call the parent class constructor
    this.key = key; // Encryption key
    this.vector = vector; // Initialization vector
    }

    // _transform method is called for each chunk of data
    _transform(chunk, encoding, callback){
        // Create a cipher using AES-256-CBC algorithm (AES encryption -> Advanced Encryption Standard)
        const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.vector);
        // Encrypt the chunk
        const encryptedData = Buffer.concat([cipher.update(chunk), cipher.final()]);
        this.push(encryptedData);
        callback();
}}

// Generate a random 256-bit key
const key = crypto.randomBytes(32); 

// Generate a random 128-bit initialization vector
const vector = crypto.randomBytes(16);

// Create instances of the streams
const encryptStream = new EncryptStream(key, vector);

// Create a Gzip transform stream
const gzipStream = zlib.createGzip();

// Create a readable stream from an input file
const readableStream = fs.createReadStream('input.txt');
// Create a writable stream to an output file
const writableStream = fs.createWriteStream('output.txt.gz.enc');

// Pipe the streams: Readable -> Gzip -> Encrypt -> Writable
readableStream.pipe(gzipStream).pipe(encryptStream).pipe(writableStream);

// Listen for the 'finish' event to know when the process is complete
console.log('File has been compressed and encrypted successfully.Check output.txt.gz.enc');


