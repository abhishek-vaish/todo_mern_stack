const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { DBConnection } = require("./models");

export class App {
  #dbURI: string;
  BASE_DIR: string;
  ENV: string;
  CONFIG: any;
  app: typeof express;
  dbConnect: typeof DBConnection;

  constructor() {
    this.BASE_DIR = path.dirname(__filename);
    this.ENV = process.env.ENV || "development";
    this.CONFIG = JSON.parse(
      fs.readFileSync(
        this.BASE_DIR + "/resources" + "/" + this.ENV + ".json",
        "utf-8"
      )
    );
    this.app = express();
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.#dbURI = `${this.CONFIG.connection.DIALECT}://${this.CONFIG.connection.USERNAME}:${this.CONFIG.connection.PASSWORD}@${this.CONFIG.connection.HOSTNAME}:${this.CONFIG.connection.PORT}/${this.CONFIG.connection.DBNAME}`;
    this.dbConnect = new DBConnection(this.#dbURI);
    this.dbConnect.connectDB();
  }

  runServer(): void {
    this.app.listen(this.CONFIG.server.PORT, () => {
      console.log(`Server is running on PORT: ${this.CONFIG.server.PORT}`);
    });
  }
}
