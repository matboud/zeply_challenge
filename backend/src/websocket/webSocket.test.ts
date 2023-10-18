import WebSocket from "jest-websocket-mock";
import wsClient from "./index";

describe("WebSocketClient", () => {
  let server: WebSocket;

  beforeEach(async () => {
    server = new WebSocket("wss://ws.blockchain.info/inv");
    await server.connected;
  });

  afterEach(() => {
    WebSocket.clean();
  });

  it("should handle connection failure", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    server.close();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Connection error:",
      expect.anything()
    );

    consoleSpy.mockRestore();
  });

  it("should handle incoming messages", async () => {
    const mockData = { foo: "bar" };
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

    // Simulate a message from the WebSocket server
    server.send(JSON.stringify(mockData));

    expect(consoleLogSpy).toHaveBeenCalledWith(
      `New transaction: ${JSON.stringify(mockData, null, 2)}`
    );

    consoleLogSpy.mockRestore();
  });
});
