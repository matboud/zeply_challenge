import { client as WebSocketClient } from "websocket";

// i kept it static as the address dioesn't chhange which was the reason why i didn't integrate it in the frontend.
const addressToMonitor =
  "bc1paw7gttfg8x4ajgqlczqpqwhcwcfjn44td40gz785hhs7wj56p8usc2pkqr";

const wsClient = new WebSocketClient();

wsClient.on("connectFailed", (error) => {
  console.error("Connection error:", error);
});

wsClient.on("connect", (connection) => {
  console.log("Connected to Blockchain.com WebSocket API");

  connection.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  connection.on("close", () => {
    console.log("Connection closed");
  });

  // Subscribe to transactions for your address
  connection.send(JSON.stringify({ op: "addr_sub", addr: addressToMonitor }));

  connection.on("message", (message) => {
    if (message.type === "utf8") {
      const data = JSON.parse(message.utf8Data);
      console.log(`New transaction: ${JSON.stringify(data, null, 2)}`);
    }
  });
});

export default wsClient;
