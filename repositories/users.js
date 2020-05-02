const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const scrypt = util.promisify(crypto.scrypt);

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
    const salt = crypto.randomBytes(8).toString("hex");
    const buf = await scrypt(attr.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attr,
      password: `${buf.toString("hex")}.${salt}`,
    };
    records.push(record);
    await this.writeAll(records);
    return record;
  }

  async comparePasswords(saved, supplied) {
    //saved = password saved in out database. 'hashed.salt'
    //supplied = password entered by user
    const [hashed, salt] = saved.split(".");
    const hashedSupplied = await scrypt(supplied, salt, 64);

    return hashed === hashedSupplied;
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
    const records = await this.getAll();

    for (let record of records) {
      let found = true;

      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
          // throw new Error(`${filters[key]} not found!`);
        }
      }

      if (found) {
        return record;
      }
    }
  }
}

module.exports = new UsersRepository("users.json");

//==========================================================================
//* What happens if you just export the whole "UserRepository" class?
//! modules.exports = UsersRepository;

//* You will need to run the code below in every file that uses UserRepository
//! Otherwise you can do "new UserRepo("users.json")" to fix that issue

//? ANOTHER FILE!
// UserRepository = require("./users")
// const repo = new UsersRepository("users.json")

//! Otherwise, if you use new UsersRepository("users.json")
//? Another File
// const repo = require('./users')
// repo.getAll();
// repo.getOne();

//* In conclusion, you only need ONE UsersRepository class

//===================================================================
//! Testing above code to confirm everthing works individually
// const test = async () => {
//   const repo = new UsersRepository("users.json");
//   // console.log(await repo.getAll());
//   await repo.delete("c97f830f");
//   // await repo.create({ email: "Nathan@gmail.com", password: "password" });
//   // await repo.update("9812f08e", { password: "NewpPassword" });
//   // const user = await repo.getOneBy({ email: "Nathan@gmail.com" });
//   console.log(user);
// };

// test();
