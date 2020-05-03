module.exports = () => {
  return `
      <div>
      <h2>Sign In</h2>
        <form method="POST" style="width: 50%; margin: 10px;" >
          <input name="email" placeholder="email"/>
          <input name="password" placeholder="password" style="margin: 5px 0;"/>
          <br>
          <button style="margin: 5px 0;">Sign In</button>
        </form>
      </div>
  `;
};
