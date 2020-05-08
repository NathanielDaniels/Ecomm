const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ errors }) => {
  return layout({
    content: `
    <div>
      <h2>Sign In</h2>
      <form method="POST" style="width: 50%; margin: 10px;" >
        <input name="email" placeholder="email"/> <br>
        ${getError(errors, "email")}
        <input name="password" placeholder="password" style="margin: 5px 0;"/><br>
        ${getError(errors, "password")}
        <br>
        <button style="margin: 5px 0;">Sign In</button>
      </form>
    </div>
  `,
  });
};
