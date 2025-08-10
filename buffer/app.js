const { Buffer } = require("buffer");

// Allocate a new buffer of 4 bytes, initialized to zero
const memoryContainer = Buffer.alloc(4);

// Print the entire buffer in hex format
console.log(memoryContainer);

// Print the first byte (will be 0 initially)
console.log(memoryContainer[0]);

// Assign values to each byte in the buffer
memoryContainer[0] = 0xf4; // 244 in decimal
memoryContainer[1] = 0x34; // 52 in decimal
memoryContainer[2] = 0xb6; // 182 in decimal
memoryContainer[3] = 0xff; // 255 in decimal

// Print each byte's decimal value
console.log(memoryContainer[0]); // 244
console.log(memoryContainer[1]); // 52
console.log(memoryContainer[2]); // 182
console.log(memoryContainer[3]); // 255

const buff = Buffer.from([0x48,0x69,0x21]);
console.log(buff.toString('utf-8'));

const buff1 = Buffer.from("486921", 'hex');
console.log(buff1.toString('utf-8'));

const buff2 = Buffer.from("string", "utf-8");
console.log(buff2.toString("utf8"));

const buff3 = Buffer.from("E0A49B", "hex");
console.log(buff3.toString("utf-8"));