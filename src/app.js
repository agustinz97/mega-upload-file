const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");

const path = require("path");
const fs = require("fs");
const randomstring = require("randomstring");

const config = require("./config/index");

const { upload } = require("./mega/index");

/* Middlewares */
app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(config.port, (err) => {
  console.log(`Server on port ${config.port}`);
});

app.get("/", (req, res) => {
  res.json({
    message: "Connected",
  });
});

app.post("/upload", async (req, res) => {
  try {
    if (!req.files) {
      console.log("No files");
      res.statusCode = 403;
      res.json({ message: "No files" });
    } else {
      const file = req.files.file;

      const newName =
        randomstring.generate(30) + Date.now() + path.extname(file.name);
      const filePath = path.join(__dirname, "tmp", newName);

      file.mv(filePath);

      const stream = fs.createReadStream(filePath);
      const downloadUrl = await upload(stream, newName);

      res.json({
        message: "Uploaded",
        filename: newName,
        downloadLink: downloadUrl,
      });

      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({ message: "Error" });
  }
});
