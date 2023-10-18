import request from "supertest";
import {app} from "./app";

describe("App Endpoints", () => {
  it("should return 200 OK on GET /", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("BTC Info API is Running");
  });

  it("should return 200 OK on GET /api-docs", async () => {
    const res = await request(app).get("/api-docs");
    expect(res.status).toBe(200);
  });
});
