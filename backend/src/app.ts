import express from "express";
import blockchainRoutes from "./routes/blockchainController";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import db from "./database/initDb";
import wsClient from "./websocket";

export const app = express();
const PORT = process.env.PORT || 3000;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "BTC Info API",
            version: "1.0.0",
            description: "API to fetch Bitcoin information",
        },
    },
    apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", blockchainRoutes);

app.get("/", (req, res) => {
    const wsURL = 'wss://ws.blockchain.info/inv';

    wsClient.connect(wsURL);
    res.send("BTC Info API is Running");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
