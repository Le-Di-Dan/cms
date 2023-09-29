require("dotenv").config();
const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("static"));

app.get("/", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.sendFile(path.resolve(__dirname, "./html/home.html"), (err) =>
    console.log(err)
  );
});

app.get("/login", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.sendFile(path.resolve(__dirname, "./html/login.html"), (err) => {
    if (err) {
      console.log(err);
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  try {
    let users = fs.readFileSync(
      path.resolve(__dirname, "./storage/users.json"),
      {
        encoding: "utf-8",
      }
    );
    users = JSON.parse(users);
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(401).json({ message: "Unauthenticated" });
    }
  } catch (error) {}
});

app.get("/view-content", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.sendFile(path.resolve(__dirname, "./html/view-content.html"), (err) =>
    console.log(err)
  );
});

app.get("/add-content", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.sendFile(path.resolve(__dirname, "./html/add-content.html"), (err) =>
    console.log(err)
  );
});

app.get("/edit-profile", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.sendFile(path.resolve(__dirname, "./html/edit-profile.html"), (err) =>
    console.log(err)
  );
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Start server at ${port}`));
