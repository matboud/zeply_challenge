import { Database } from "sqlite3";
import { TransactionInfo } from "../types/blockchainTypes";
import db from "../database/initDb";

export const insertTransaction = (
  db: Database,
  transactionInfo: TransactionInfo | any
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const { hash, amount, blockHeight } = transactionInfo;
    db.run(
      "INSERT INTO transactions (hash, amount, blockHeight) VALUES (?, ?, ?)",
      [hash, amount, blockHeight],
      function (err) {
        if (err) {
          return reject(err);
        }
        resolve();
      }
    );
  });
};

export const findTransactionByHash = async (hash: string) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM transactions WHERE hash = ?", [hash], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
};

export const saveTransaction = (
  db: Database,
  transaction: TransactionInfo
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const sql = `
        INSERT INTO transactions(hash, sender, recipient, amount)
        VALUES(?, ?, ?, ?)
      `;

    db.run(
      sql,
      [
        transaction.hash,
        transaction.sender,
        transaction.recipient,
        transaction.amount,
      ],
      (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      }
    );
  });
};
