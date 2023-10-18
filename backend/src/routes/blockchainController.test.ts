import request from "supertest";
import express from "express";
import router from "../routes/blockchainController";

const app = express();
app.use(express.json());
app.use("/", router);

describe("API Routes", () => {
  // Testing /address/:address route
  it("should return 400 for invalid address", async () => {
    const response = await request(app).get("/address/invalidAddress");
    expect(response.status).toBe(400);
  });

  // Testing /transaction/:transaction route
  it("should return 400 for invalid transaction", async () => {
    const response = await request(app).get("/transaction/invalidTransaction");
    expect(response.status).toBe(400);
  });

  // Add more tests to validate the response when the transaction is valid

  // Testing /exchange-rates route
  it("should return exchange rates", async () => {
    const response = await request(app).get("/exchange-rates");
    expect(response.status).toBe(200);
  });

  // Testing /most-searched/:queryType route
  it("should return 400 for invalid query type", async () => {
    const response = await request(app).get("/most-searched/invalidType");
    expect(response.status).toBe(400);
  });
});
