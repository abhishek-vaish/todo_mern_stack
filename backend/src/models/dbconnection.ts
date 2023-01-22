const { Sequelize } = require("sequelize");

class DBConnection {
  #DBURI: string;
  sequelize: typeof Sequelize;

  constructor(dbURI: string) {
    this.#DBURI = dbURI;
    this.sequelize = new Sequelize(this.#DBURI);
  }

  async connectDB(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log("Database Successfully Connected!!");
    } catch (err) {
      console.log("Couldnot connect to the Database :: ", err);
    }
  }
}

export { DBConnection };
