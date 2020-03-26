const fs = require("fs");

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a Repository Requires a Filename");
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }
  async checkForFile() {}
}

const repo = new UsersRepository("users.json");
