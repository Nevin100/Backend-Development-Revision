// Notes for Setting up a Node.js project with TypeScript
export {};
// 1.) First we will install the following packages as our developer dependency  : 
// --> npm i -D typescript ts-node @types/node nodemon
// 2.) Now we will initialize the tsconfig.json file using the following command :
// --> npx tsc --init
// 3.) Now we will add the following script in package.json file :
// "scripts": {
//     "build": "tsc",
//     "start": "nodemon dist/index.ts",
//     "dev": "ts-node src/index.ts"
//   },
// 4.) In the tsconfig.json file we will set the following properties :
// "target": "esNext",                     // Set the JavaScript version target to ESNext
// "module": "nodeNext",                   // Set the module system to Node.js Next
// "rootDir": "./src",                     // Specify the root directory of input files
// "outDir": "./dist",                     // Specify the output directory for compiled files
// strict: true,                           // Enable all strict type-checking options
// include: ["src/**/*"],                  // Include all TypeScript files in the src directory
// exclude: ["node_modules"]               // Exclude the node_modules directory
// 5.) Now we will create a folder named src and inside that we will create index.ts file
//# sourceMappingURL=notes.js.map