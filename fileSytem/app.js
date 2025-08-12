// Import fs/promises for Promise-based API (async/await)
const fsPromise = require('fs/promises');

// Import fs for Callback-based API
const fsCallback = require('fs');

// -----------------------------
// Promise API version
// -----------------------------
// An async IIFE so we can use await without needing a separate named function
(async () => {
    try {
        // Copies file.txt to copied-promise.txt asynchronously
        // This runs in libuv's thread pool without blocking the event loop
        // If copied-promise.txt already exists, it will be overwritten
        await fsPromise.copyFile("file.txt", "copied-promise.txt");

        // No return value — success means no error was thrown
    } catch (error) {
        // If the source file doesn't exist or permissions are insufficient,
        // an error will be thrown and caught here
    }
})();

// -----------------------------
// Callback API version
// -----------------------------
// Uses the older callback style — still asynchronous, also runs in libuv's thread pool
// Takes (sourceFile, destinationFile, callback) as parameters
fsCallback.copyFile("file.txt", "copied-callback.txt", (error) => {
    // If an error occurs during copying, it is passed to this callback as 'error'
    // A null error means the copy succeeded
});
