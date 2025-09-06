const fs = require("node:fs/promises");
(async () => {
  const fileHandleRead = await fs.open("text-big.txt", "r");
  const filehandlewrite = await fs.open("dest.txt", "w");
  const streamRead = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024,
  });
  const streamWrite = filehandlewrite.createWriteStream();

  let split = "";

  streamRead.on("data", (chunk) => {
    let chunkArr = chunk.toString("utf-8").split("  ");

    if (Number(chunkArr[0]) !== Number(chunkArr[1]) - 1) {
      if (split) {
        chunkArr[0] = split.trim() + chunkArr[0].trim();
      }
    }

    if (
      Number(chunkArr[chunkArr.length - 2]) + 2 !==
      Number(chunkArr[chunkArr.length - 1])
    ) {
      split = chunkArr.pop();
    }

    chunkArr.forEach((number) => {
      if (number % 2 === 0) {
        if (!streamWrite.write(number + " ")) {
          streamRead.pause();
        }
      }
    });
  });

  streamWrite.on("drain", () => {
    streamRead.resume();
  });

  streamRead.on("end", () => {
    if (split.trim()) {
      const num = Number(split.trim());
      if (num % 2 === 0) {
        streamWrite.write(num + " ");
      }
    }
    streamWrite.end();
  });

  streamWrite.on("finish", () => {
    console.log("Stream Write Finished");
    fileHandleRead.close();
    filehandlewrite.close();
  });
})();
