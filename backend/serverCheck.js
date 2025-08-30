import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("✅ Client connected");

  ws.on("message", (msg) => {
    console.log("Received:", msg.toString());
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });

  ws.send("connected");
});

console.log("🟢 WebSocket server listening on ws://localhost:8080");
