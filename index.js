const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const usersRepo = require("./repositories/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["sdfsdflsjdflskjdf"],
  })
);

app.get("/", (req, res) => {
  res.send(`
    <div style="display: flex">
      <form method="POST" >
        <input name="email" placeholder="email"/>
        <input name="password" placeholder="password"/>
        <input name="passwordConfirmation" placeholder="confirm password"/>
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

app.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });

  if (existingUser) {
    return res.send("Email Already In Use");
  }

  if (password !== passwordConfirmation) {
    return res.send("Passwords must match to continue");
  }

  // Create a user in our user repo to represent this person
  const user = await usersRepo.create({ email, password });

  // Store the id of that user inside the users cookie
  req.session === {}; // added by cookie session

  res.send("Account Created!");
});

app.listen(3000, () => {
  console.log("listening");
});

//? ==========================================================================
//! BodyParser by hand (How It Works)
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
