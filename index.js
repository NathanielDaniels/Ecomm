// const nodemon = require("nodemon");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email"/>
        <input name="password" placeholder="password"/>
        <input name="passwordConfirmation" placeholder="confirm password"/>
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

app.post("/", (req, res) => {
  // get acces to email, password, passwordConfirmation
  req.on("data", data => {
    console.log(data);
  });
  res.send("Account Created!");
});

app.listen(3000, () => {
  console.log("listening");
});
