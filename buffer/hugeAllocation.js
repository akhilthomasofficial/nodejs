const { Buffer, constants } = require("buffer");

// Print Node.js internal buffer limits
// MAX_STRING_LENGTH → Maximum length of a string that can be created
// MAX_LENGTH → Maximum size (in bytes) of a single Buffer instance
console.log("Max string length:", constants.MAX_STRING_LENGTH);
console.log("Max buffer length (bytes):", constants.MAX_LENGTH);

// Allocate a buffer of 6e9 bytes (~6GB) — this is huge and may cause memory issues!
// Note: Allocating this much memory may fail if your system doesn't have enough RAM + swap
const buff = Buffer.alloc(6e9);

// Optional: See how big the buffer actually is
console.log("Buffer size (bytes):", buff.length);
console.log("Buffer size (GB):", (buff.length / (1024 ** 3)).toFixed(2));

// Periodically fill the buffer with a value (0x22 = ASCII character '"')
// This simulates continuously writing to memory
setInterval(() => {
  // Old school way: manually write each byte (slow!)
  // for (let i = 0; i < buff.length; i++) {
  //   buff[i] = 0x22;
  // }

  // Efficient way: fill the entire buffer with the byte value 0x22
  buff.fill(0x22);

  console.log("Buffer filled with 0x22 at", new Date().toISOString());
}, 5000);

// Extra: Show the first 10 bytes of the buffer after 1 second
setTimeout(() => {
  console.log("First 10 bytes:", buff.subarray(0, 10));
  console.log("First 10 bytes as hex:", buff.subarray(0, 10).toString("hex"));
  console.log("First 10 bytes as UTF-8:", buff.subarray(0, 10).toString("utf8"));
}, 1000);