const fs = require("fs");
const crypto = require("crypto");

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

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8",
      })
    );
  }

  async create(attr) {
    attr.id = this.randomID();
    const records = await this.getAll();
    records.push(attr);
    await this.writeAll(records);
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  randomID() {
    return crypto.randomBytes(4).toString("hex");
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, attr) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);
    if (!record) {
      throw new Error(`Record with id ${id} not found!`);
    }
    Object.assign(record, attr);
    await this.writeAll(records);
  }

  async getOneBy(filters) {
    const records = await this.getAll()

    for (let record of records) {
      let found = true;

      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
          throw Error (`${key} is not found`)
        }
      }

      if (found) {
        console.log(record)
        return record;
      }

    }

    return records.find(filters) => {
      // let filter = 
      fitler.id === id;
      fitler.password === password
    }
  }
}

const test = async () => {
  const repo = new UsersRepository("users.json");
  console.log(await repo.getAll());
  // await repo.delete("89d2f99f");
  // await repo.create({ email: "Nathan@gmail.com", password: "password" });
  await repo.update("9812f08e", { password: "NewpPassword" });
};

test();
