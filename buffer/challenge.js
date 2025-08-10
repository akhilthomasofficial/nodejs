const { Buffer } = require('buffer');

// Binary sequence: 0100 1000 0110 1001 0010 0001
// This represents the ASCII characters: 'H', 'i', '!'

// Allocate a buffer of 3 bytes (24 bits total)
const buff = Buffer.alloc(3);

// Assign each byte using hexadecimal notation
buff[0] = 0x48; // 0x48 = 72 decimal = 'H' in ASCII
buff[1] = 0x69; // 0x69 = 105 decimal = 'i' in ASCII
buff[2] = 0x21; // 0x21 = 33 decimal = '!' in ASCII

// Convert the buffer to a UTF-8 string and print: "Hi!"
console.log(buff.toString('utf-8'));
