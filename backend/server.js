const express = require("express");

const http = require("http");

const WebSocket = require("ws");

const { SDK, zeroBytes32, SchemaEncoder } = require("@somnia-chain/streams");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const symbols = ['BTC', 'ETH', 'SOL', 'DOGE', 'BNB', 'AAVE', 'TRX', 'XRP', 'LTC', 'TON', 'SUI', 'ICP', 'ETC', 'PEPE', 'POL', 'ATOM', 'ARB', 'OP', 'INJ', 'IOTA', 'TWT', 'ADA', 'CAKE'];

const schema = symbols.map(x => {
    return `uint256 ${x}`
}).concat(['uint64 timestamp']).join(', ');

const schemaEncoder = new SchemaEncoder(schema);

const streams = symbols.map(s => s.toLowerCase() + 'usdt@trade').join('/');
const wsUrl = `wss://data-stream.binance.vision/stream?streams=${streams}`;

let ws;
let reconnectTimeout = null;
let reconnectDelay = 1500;

const pricesCache = {};

const getPublicClient = async () => {

    const { createPublicClient, http } = await import("viem");
    const { somniaTestnet } = await import("viem/chains");

    const publicClient = createPublicClient({
        chain: somniaTestnet,
        transport: http(process.env.RPC_URL)
    });

    return publicClient;

}

const getWalletClient = async () => {

    const { createWalletClient, http } = await import("viem");
    const { somniaTestnet } = await import("viem/chains");
    const { privateKeyToAccount } = await import("viem/accounts");

    const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`);

    const walletClient = createWalletClient({
        account,
        chain: somniaTestnet,
        transport: http(process.env.RPC_URL),
    });

    return walletClient;

}

const connectWebSocket = () => {

    ws = new WebSocket(wsUrl);

    ws.on('open', () => {
        console.log('Connected to Binance WebSocket streams');
    });

    ws.on('message', (data) => {
        try {
            const parsed = JSON.parse(data);
            if (parsed.data && parsed.data.e === 'trade') {
                const trade = parsed.data;
                const price = parseFloat(trade.p);
                const index = trade.s.replace("USDT", '');
                pricesCache[index] = price;
            }
            for (let symbol of symbols) {
                if (!pricesCache.hasOwnProperty(symbol)) {
                    pricesCache[symbol] = 0;
                }
            }
        } catch (err) {
            console.log(err);
        }
    });

    ws.on('close', () => {
        scheduleReconnect();
    });

    ws.on('error', (err) => {
        scheduleReconnect();
    });

    ws.on('ping', () => {
        ws.pong();
    });
}

const scheduleReconnect = () => {
    if (!reconnectTimeout) {
        reconnectTimeout = setTimeout(() => {
            reconnectTimeout = null;
            connectWebSocket();
        }, reconnectDelay);
    }
}

let schemaLogged = false;

const getPrices = async () => {

    const { toHex } = await import("viem");

    const public = await getPublicClient();
    const wallet = await getWalletClient();

    const sdk = new SDK({
        public,
        wallet
    });

    const schemaId = await sdk.streams.computeSchemaId(schema);

    if (schemaLogged == false) {
        console.log(`Schema ID: [${schemaId}]`);
        schemaLogged = true;
    }

    try {

        const hash = await sdk.streams.registerDataSchemas(
            [{ schemaName: 'somnixPriceFeeds', schema, parentSchemaId: zeroBytes32 }],
            true
        );

        const result = await public.waitForTransactionReceipt({ hash });
        console.log(`Stream deployed`, result);

    }
    catch (error) {}

    const pricingData = [];

    for (let symbol of symbols) {
        const item = Math.floor(pricesCache[symbol] * 1e18);
        pricingData.push({
            name: symbol, value: item.toLocaleString("fullwide", { useGrouping: false }), type: 'uint256'
        });
    }

    const timestamp = Math.floor(new Date().getTime() / 1000);

    pricingData.push({
        name: 'timestamp', value: timestamp.toString(), type: 'uint64'
    });

    const dataId = toHex(Date.now().toString(), { size: 32 });

    const data = schemaEncoder.encodeData(pricingData);

    const tx = await sdk.streams.set([{ id: dataId, schemaId, data }]);

    await public.waitForTransactionReceipt({ hash: tx });

    setTimeout(getPrices, 5000);

    console.log('Stored prices on-chain:', pricingData);

};

// Start app
server.listen(PORT, () => {
    console.log(`Price Feed Server running on ${PORT}`);
    connectWebSocket();
    setTimeout(() => {
        getPrices();
    }, 5000);
});