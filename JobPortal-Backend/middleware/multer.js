// import multer from "multer";

// const storage = multer.memoryStorage();

// export const singleUpload = multer({storage}).single("file");

import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({ storage }).fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);
