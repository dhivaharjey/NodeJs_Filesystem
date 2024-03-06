import express from "express";
import fs from "fs";
import path from "path";
import { format } from "date-fns";
const app = express();
const PORT = 4000; //http://localhost:4000

app.get("/", (req, res) => {
  res.status(200).send(
    `<div style = " background-color:aqua; font-size:60px; text-align:center; ">EXPRESS
     </div>
     <div style = "  text-align:center; "><h2> API END POINT  TO <strong> CREATE</strong> text file <strong style ="background-color:yellow; color: red;"> /createfile</strong> </h2>
      <h2> API END POINT  TO <strong> READ</strong> text file <strong style ="background-color:yellow; color: red;"> /readfile</strong> </h2>
     </div>
      `
  );
});

const folderPath = "TimeStamp"; // Folder Path

app.get("/createfile", (req, res) => {
  // get method to create file
  const date_time = format(new Date(), "yyyy-MMM-dd-HH-mm-sss"); // to create current date and time
  const filePath = path.join(folderPath, `file_${date_time}.txt`); // to set the path to create file
  fs.writeFile(filePath, date_time, (err) => {
    // in-built method to create file
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to create file");
    }
    res.json({ message: "File created successfully" });
  });
});
app.get("/readfile", (req, res) => {
  try {
    fs.readdir(folderPath, (err, files) => {
      // to find the directory
      if (err) {
        console.error(err);
        return res.status(500).send("Failed to read folder");
      }
      const textFiles = files.filter((file) => path.extname(file) === ".txt"); // to find the .txt file using filter
      // res.json(textFiles);
      const fileContents = textFiles.map((file) => {
        // read the file content
        const filePath = path.join(folderPath, file);
        const content = fs.readFileSync(filePath, "utf8");
        return { fileName: file, content: content };
      });

      res.json(fileContents);
    });
  } catch (error) {
    res.status(500).send("Not fount");
  }
});
app.listen(PORT, () => {
  console.log(`App is running in ${PORT}`);
});
