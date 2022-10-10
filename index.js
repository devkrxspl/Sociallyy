//Constants
const express = require("express");
const path = require("path");
const http = require("http");
const jsSHA = require("jssha");

const root = path.resolve(path.dirname(""));

//API
const db = require(`${root}/API/DB.js`);
const fh = require(`${root}/API/FH.js`);

//Roots
const dbroot = root + "/DB";
const publicRoot = root + "/Public";
const htmlRoot = publicRoot + "/HTML";

//Data
const accounts = db.createDB(dbroot, "Accounts");

//App Setup
const app = express();
const server = http.createServer(app);
var io = require('socket.io')(server);

app.use(express.static(root + '/Public'));

//App Main
app.all("/", function(req, res) {
  res.sendFile(htmlRoot + "/index.html");
});

app.get("/:path", function(req, res) {
  const p = req.path + ".html";

  if (fh.existsFile(htmlRoot, p)) {
    res.sendFile(htmlRoot + p);
  } else {
    res.sendFile(htmlRoot + "/404.html");
  }
});

//Socket Main
io.sockets.on("connection", function(socket) {

  socket.on("register", function(data) {

    var json = db.readDB(accounts);

    if (json.hasOwnProperty(data.username)) {
      socket.emit("register", { "error": "Username already taken." });
    } else {

      const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });

      shaObj.update(data.password);

      const hash = shaObj.getHash("HEX");

      db.appendDB(accounts, db.createObject(data.username, hash));

      socket.emit("register", {});
    }
  });

  socket.on("login", function(data) {

    const username = data.username;
    const password = data.password;

    var json = db.readDB(accounts);

    const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });

    shaObj.update(data.password);

    const hash = shaObj.getHash("HEX");

    if (json[username]) {
      if (hash == json[username]) {
        socket.emit("login", {}); // Ideally maybe pass a session 
      } else {
        socket.emit("login", { "error": "Invalid password" });
      }
    } else {
      socket.emit("login", { "error": "Invalid username" });
    }
  })
});

server.listen(3000);