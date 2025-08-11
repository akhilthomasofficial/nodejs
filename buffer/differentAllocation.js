const { Buffer } = require("buffer"); // Import Buffer from Node's buffer module

// ===== 1. Large SAFE allocation =====
// Buffer.alloc(size, fillValue)
// - Size: 10,000 bytes (> 4 KB cutoff)
// - Fills every byte with '0' (zero fill = safe)
// - Bypasses the 8 KB shared pool (large allocation)
const buff = Buffer.alloc(10000, 0); 

// ===== 2. Large UNSAFE allocation =====
// Buffer.allocUnsafe(size)
// - Size: 10,000 bytes (> 4 KB cutoff)
// - Memory is NOT zero-filled (faster, but contains old RAM data)
// - Bypasses the shared 8 KB pool (large allocation)
const buffUnsafe = Buffer.allocUnsafe(10000);

// ===== 3. Checking for non-zero bytes in unsafe buffer =====
// - Loops through every byte in buffUnsafe
// - If any byte is non-zero (due to leftover memory), logs the full buffer as UTF-8
for (let i = 0; i < buffUnsafe.length; i++) {
    if (buffUnsafe[i]) {
        console.log(buffUnsafe.toString('utf-8'));
    }
}

// ===== 4. Buffer.from() =====
// Buffer.from(...) internally calls allocUnsafe for small allocations
// - If <= 4 KB → uses shared pool (fast, may contain garbage if not initialized)
// - If > 4 KB → standalone allocation (like allocUnsafe)
Buffer.from();

// ===== 5. Buffer.concat() =====
// Buffer.concat(...) also uses allocUnsafe internally to allocate the result buffer
// - Cutoff rules same as above (≤ 4 KB → pool, > 4 KB → standalone)
Buffer.concat();

// ===== 6. Buffer.allocUnsafeSlow() =====
// - Always creates a new standalone buffer (NEVER from shared pool)
// - Behaves like allocUnsafe (no zero fill, contains old RAM data)
// - Used to avoid affecting the shared pool's offset pointer
const buffUnsafeSlow = Buffer.allocUnsafeSlow(1000);