import express from "express";
import { isValidAddress, isValidTransaction } from "../utils/validators";
import {
  fetchBalanceDetailsByAddress,
  fetchExchangeRates,
  fetchTransactionDetails,
} from "../utils/blockchainApi";
import {
  getAllSearchQueriesByType,
  upsertSearchQuery,
} from "../dao/searchQueryDao";
import db from "../database/initDb";

const router = express.Router();

router.get("/address/:address", async (req, res) => {
  const { address } = req.params;
  if (!isValidAddress(address)) {
    return res.status(400).json({ error: "Invalid address format" });
  }
  try {
    upsertSearchQuery(db, {
      queryValue: address,
      queryType: "address",
    });
    const data = await fetchBalanceDetailsByAddress(address);
    res.json(data);
  } catch (error: any) {
    console.log(`failed to get details using transaction id ${address}`);
    console.log(error);
    // res.status(404).json({error: error.toString()});
  }
});

router.get("/transaction/:transaction", async (req, res) => {
  const { transaction } = req.params;
  if (!isValidTransaction(transaction)) {
    return res.status(400).json({ error: "Invalid transaction format" });
  }
  try {
    upsertSearchQuery(db, {
      queryValue: transaction,
      queryType: "transaction",
    });
    const data = await fetchTransactionDetails(transaction);
    res.json(data);
  } catch (error: any) {
    console.log(`failed to get details using transaction id ${transaction}`);
    res.status(error.statusCode).json({ error: error.toString() });
  }
});

router.get("/exchange-rates", async (_, res) => {
  try {
    const exchangeRates = await fetchExchangeRates();
    res.json(exchangeRates);
  } catch (error: any) {
    console.log("failed to load all exchange rates");
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/most-searched/:queryType", async (req, res) => {
  const { queryType } = req.params;
  if (!["address", "transaction"].includes(queryType)) {
    res.status(400).json({ error: "invalid query type parameter" });
    return;
  }
  try {
    const rows = await getAllSearchQueriesByType(db, queryType);
    res.send(rows);
  } catch (error: any) {
    console.log("failed to load all most-searched queries");
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
