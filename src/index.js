require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Home Page" });
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  // res.json({ message: "file uploaded successfully!" });
  res.json(req.file);
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Page Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
