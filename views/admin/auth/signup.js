const layout = require("../layout");

module.exports = ({ req }) => {
  return layout({
    content: `
    <div>
      Your ID is: ${req.session.userId} <hr>
      <h2>Sign Up</h2>
      <form method="POST" style="width: 50%; margin: 10px;" >
        <input name="email" placeholder="email"/>
        <input name="password" placeholder="password" style="margin: 5px 0;"/>
        <input name="passwordConfirmation" placeholder="confirm password"/>
        <br>
        <button style="margin: 5px 0;">Sign Up</button>
      </form>
    </div>
  `,
  });
};
