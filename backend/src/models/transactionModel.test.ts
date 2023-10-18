import { Database } from "sqlite3";
import * as transactionModel from "./transactionModel";

describe("Transaction Model", () => {
  let db: Database;

  beforeAll(() => {
    db = new Database(":memory:");

    return new Promise((resolve, reject) => {
      db.exec(
        `
        CREATE TABLE transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          hash TEXT,
          amount REAL,
          blockHeight INTEGER,
          sender TEXT,
          recipient TEXT
        );
      `,
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(undefined);
          }
        }
      );
    });
  });

  afterAll(() => {
    return new Promise((resolve, reject) => {
      db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(undefined);
        }
      });
    });
  });
});
