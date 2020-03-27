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
  async GetAll() {
    // Open file called "this.filename"
    const contents = await fs.promises.readFile(this.filename, {
      encoding: "utf8"
    });
    // Read its contents
    console.log(contents);
    // Parse Contents
    // Return Parsed Data
  }
}

const test = async () => {
  const repo = new UsersRepository("users.json");
  await repo.GetAll();
};

test();
