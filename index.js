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

app.get("/register", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.sendFile(path.resolve(__dirname, "./html/register.html"), (err) => {
    if (err) {
      console.log(err);
    }
  });
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  let users = fs.readFileSync(path.resolve(__dirname, "./storage/users.json"), {
    encoding: "utf-8",
  });
  users = JSON.parse(users || "[]") || [];
  const isExisted = users.find(
    (user) => user.username === username && user.email === email
  );
  if (isExisted) {
    res.status(400).json({ message: "Account is existed" });
  } else {
    res.status(201).json({ message: "success" });
    fs.writeFile(
      path.resolve(__dirname, "./storage/users.json"),
      JSON.stringify([
        ...users,
        { id: users.length, username, password, email },
      ]),
      { encoding: "utf-8" },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
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

app.post("/content", (req, res) => {
  const { title, brief, content } = req.body;
  const file = path.resolve(__dirname, "./storage/contents.json");
  let contents = fs.readFileSync(file, { encoding: "utf-8" });
  contents = JSON.parse(contents || "[]");
  const d = new Date();
  const date = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  let hours = d.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = d.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  const created_on = `${date}/${month}/${year} ${hours}:${minutes}`;
  const newContent = { id: contents.length, title, brief, content, created_on };
  contents = [...contents, newContent];
  fs.writeFile(file, JSON.stringify(contents), { encoding: "utf-8" }, (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.status(201).json({
    message: "success",
    data: [newContent],
  });
});

app.get("/content", (req, res) => {
  const file = path.resolve(__dirname, "./storage/contents.json");
  let contents = fs.readFileSync(file, { encoding: "utf-8" });
  contents = JSON.parse(contents || "[]");
  const timeOut = setTimeout(() => {
    res.status(200).json({
      message: "success",
      data: contents,
    });
    clearTimeout(timeOut);
  }, 5000);
});

app.get("/edit-profile", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.sendFile(path.resolve(__dirname, "./html/edit-profile.html"), (err) =>
    console.log(err)
  );
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Start server at ${port}`));
