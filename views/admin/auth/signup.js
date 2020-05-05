const layout = require("../layout");
// const validators = require("../../../routes/admin/validators");

const getError = (errors, prop) => {
  // prop === 'email' || 'password' || 'passwordConfirmation
  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    return "";
  }
};

module.exports = ({ req, errors }) => {
  return layout({
    content: `
    <div>
      Your ID is: ${req.session.userId} <hr>
      <h2>Sign Up</h2>
      <form method="POST" style="width: 50%; margin: 10px;" >
        <input name="email" placeholder="email"/><br>
        ${getError(errors, "email")}
        <input name="password" placeholder="password" style="margin: 5px 0;"/>
        <br>
        ${getError(errors, "password")}
        <input name="passwordConfirmation" placeholder="confirm password"/>
        <br>
        ${getError(errors, "passwordConfirmation")}
        <br>
        <button style="margin: 5px 0;">Sign Up</button>
      </form>
    </div>
  `,
  });
};
