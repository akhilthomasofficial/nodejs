const fs = require("fs/promises");

(async () => {
  const commandHandler = await fs.open("./command.txt", "r");

  const CREATE_FILE = "Create a file";
  const DELETE_FILE = "Delete the file";
  const RENAME_FILE = "Rename the file";
  const ADD_TO_FILE = "add to the file";

  const createFile = async (path) => {
    let fileHandler;
    try {
      fileHandler = await fs.open(path, "r");
      await fileHandler.close();
      console.log(`The ${path} file is already exists`);
    } catch (error) {
      fileHandler = await fs.open(path, "w");
      await fileHandler.close();
      console.log(`The ${path} file is created`);
    }
  };

  const deleteFile = async (filepath) => {
    try {
      await fs.unlink(filepath);
      console.log(`The ${filepath} was succesffully deleted`);
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(`The ${filepath} was not found for deletion`);
      } else {
        console.log(error);
      }
    }
  };

  const renameFile = async (filename, newFileName) => {
    try {
      await fs.rename(filename, newFileName);
      console.log(
        `The file ${filename} was successfully renamed to ${newFileName}`
      );
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(
          "No file at this path to rename, or the destination doesn't exist."
        );
      } else {
        console.log("An error occurred while removing the file: ");
        console.log(error);
      }
    }
  };

  let addedContent;

  const addToFile = async (fileName, content) => {
    if (addedContent === content) return;

    try {
      const fileHandler = await fs.open(fileName, "a");
      fileHandler.write(content);
      addedContent = content;
      console.log("The content was added successfully.");
    } catch (error) {
      console.log("An error occurred while removing the file: ");
      console.log(e);
    }
  };

  commandHandler.on("change", async () => {
    const size = (await commandHandler.stat()).size;
    const buffer = Buffer.alloc(size);
    const offset = 0;
    const length = buffer.byteLength;
    const position = 0;

    await commandHandler.read(buffer, offset, length, position);
    const command = buffer.toString("utf-8");

    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    if (command.includes(DELETE_FILE)) {
      const filepath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filepath);
    }

    // rename the file <path> to <new-path>
    if (command.includes(RENAME_FILE)) {
      const idx = command.indexOf(" to ");
      const filepath = command.substring(RENAME_FILE.length + 1, idx);
      const newFilePath = command.substring(idx + 4);
      renameFile(filepath, newFilePath);
    }

    // add to the file <path> this content: <content>
    if (command.includes(ADD_TO_FILE)) {
      const idx = command.indexOf(" this content: ");
      const filePath = command.substring(ADD_TO_FILE.length + 1, idx);
      const content = command.substring(idx + 15);
      addToFile(filePath, content);
    }
  });

  const watcher = fs.watch("./command.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandHandler.emit("change");
    }
  }
})();
