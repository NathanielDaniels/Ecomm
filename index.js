const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// This helps with Dry Code Practices
app.use(bodyParser.urlencoded({ extended: true }));

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
  console.log(req.body);
  res.send("Account Created!");
});

app.listen(3000, () => {
  console.log("listening");
});

//==========================================================================
//! BodyParser by hand
//* This is now replaced by require('body-parser') + bodyParser.urlencoded({ extended: true })

// const bodyParser = (req, res, next) => {
//   if (req.method === "POST") {
//     // get acces to email, password, passwordConfirmation
//     req.on("data", data => {
//       const parsed = data.toString("utf8").split("&");
//       const formData = {};
//       for (let pair of parsed) {
//         const [key, value] = pair.split("=");
//         formData[key] = value;
//       }
//       // console.log(formData);
//       req.body = formData;
//       next();
//     });
//   } else {
//     next();
//   }
// };
