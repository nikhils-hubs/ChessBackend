import { app } from "./app.js";
import dotenv from "dotenv"
import http from "http";
import { Server } from "socket.io";
import {socketMain} from './sockets/socket.io.js';

dotenv.config();

const PORT = process.env.PORT || 8005
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.ORIGIN_CORS || "*",
        credentials: true,
    }
});
io.on("connection", (socket) => {
    console.log("🔌 socket connected", socket.id);

    socket.on("move", (data) => {
        console.log("move detected: ", data);
        socket.broadcast.emit("opponent move", data)
    });
    socket.on("disconnect", () => {
        console.log("server disconnected: ", socket.id);

    });
});
socketMain(io)

try {
    console.log("server is about to start");
    server.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    })
} catch (error) {
    console.log("error is connecting to server!!", error)
}

