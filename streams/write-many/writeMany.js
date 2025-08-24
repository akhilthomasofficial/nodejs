// -----------------------------
// Example 1: Using fs/promises (async/await)
// Expected execution time: ~1.2 sec
// -----------------------------
// (
//     async () => {
//         const fs = require('fs/promises');

//         // Start timer to measure execution time
//         console.time("writemany");

//         // Open file 'test.txt' in write mode ("w" overwrites file if exists)
//         const filehandle = await fs.open("test.txt", "w");

//         // Loop 100,000 times and write into file
//         // NOTE: Slower because each write returns a promise and isn't awaited
//         for (let i = 0; i < 100000; i++) {
//             filehandle.write(` ${i} `);
//         }

//         // End timer and log the duration
//         console.timeEnd("writemany");
//     }
// )();

// -----------------------------
// Example 2: Using fs (synchronous writes) using callback version
// Expected execution time: ~465 ms
// -----------------------------

// (
//     async () => {
//         const fs = require('node:fs');

//         // Start timer to measure execution time
//         console.time("writemany");

//         // Open file 'test.txt' in write mode
//         fs.open('test.txt', 'w', (err, fd) => {
//             if (err) throw err;

//             // Loop 100,000 times and write into file synchronously
//             // Faster because it avoids promise overhead
//             for (let i = 0; i < 100000; i++) {
//                 fs.writeSync(fd, ` ${i} `);
//             }

//             // End timer and log the duration
//             console.timeEnd("writemany");
//         });
//     }
// )();

// (
//     async () =>{
//         const fs = require('node:fs/promises');
//         console.time("writemany");
//         const filehandler = await fs.open("test.txt", 'w');
//         const stream = filehandler.createWriteStream();

//         for(let i =0; i<100000; i++){
//             const buff = Buffer.from(` ${i} `, 'utf-8');
//             stream.write(buff);
//         }

//         console.timeEnd("writemany");
//     }
// )

(async () => {
  const fs = require("node:fs/promises");
  console.time("writemany");
  const filehandler = await fs.open("test.txt", "w");
  const stream = filehandler.createWriteStream();

  let i = 0;

  console.log(stream.writableHighWaterMark);

  function writeMany() {
    while (i < 1000000) {
      const buff = Buffer.from(` ${i} `, "utf-8");

      if (i === 999999) return stream.end(buff);

      if (!stream.write(buff)) {
        break;
      }
      i++;
    }
  }

  stream.on("drain", () => {
    console.log("Drained!");
    writeMany();
  });

  stream.on("finish", () => {
    filehandler.close();
    console.timeEnd("writemany");
  });

  writeMany();
})();
