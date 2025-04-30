// server.js
const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());


const users = {};


app.post("/register", async (req, res) => {
const { username, password } = req.body;


if (users[username]) {
return res.json({ message: "Username already exists" });
}


const hashedPassword = await bcrypt.hash(password, 10);
users[username] = { username, password: hashedPassword };

res.json({ message: "User registered successfully" });
});


app.get("/welcome", (req, res) => {
const username = req.query.username;

if (users[username]) {
return res.json({ message: `Welcome, ${username}!` });
} else {
return res.json({ message: "User not found" });
}
});


app.listen(5000, () => {
console.log("Server is running on port 5000");
});
