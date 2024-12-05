// multer.js

import multer from 'multer';

// Set storage engine for multer to memoryStorage
const storage = multer.memoryStorage();

// Export multer upload with memory storage setup
export const upload = multer({ storage: storage });
