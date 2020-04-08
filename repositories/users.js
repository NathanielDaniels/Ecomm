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
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8"
      })
    );
  }

  async create(attr) {
    const records = await this.GetAll();
    records.push(attr);
    await fs.promises.writeFile(this.filename, JSON.stringify(records));
  }

  async writeAll(records) {
    await fs.promises.writeFile(this.filename, JSON.stringify(records));
  }
}

const test = async () => {
  const repo = new UsersRepository("users.json");
  await repo.create({ email: "test@test.com", password: "password" });
  const users = await repo.GetAll();
  console.log(users);
};

test();
