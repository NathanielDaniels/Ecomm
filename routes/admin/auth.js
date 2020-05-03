app.get("/signup", (req, res) => {
  res.send(`
    <div>
      Your ID is: ${req.session.userId} <hr>
      <form method="POST" style="width: 50%; margin: 10px;" >
        <input name="email" placeholder="email"/>
        <input name="password" placeholder="password" style="margin: 5px 0;"/>
        <input name="passwordConfirmation" placeholder="confirm password"/>
        <br>
        <button style="margin: 5px 0;">Sign Up</button>
      </form>
    </div>
  `);
});

app.post("/signup", async (req, res) => {
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
  req.session.userId = user.id; // added by cookie session

  res.send("Account Created!");
});

app.get("/signout", (req, res) => {
  req.session = null;
  res.send("You Logged Out");
});

app.get("/signin", (req, res) => {
  res.send(`
     <div>
     <h2>Sign In</h2>
      <form method="POST" style="width: 50%; margin: 10px;" >
        <input name="email" placeholder="email"/>
        <input name="password" placeholder="password" style="margin: 5px 0;"/>
        <br>
        <button style="margin: 5px 0;">Sign In</button>
      </form>
    </div>
    `);
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send("Email Not Found!");
  }

  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  );

  if (!validPassword) {
    return res.send("Invalid Password");
  }

  req.session.userId = user.id;
  res.send("Signed In");
});
