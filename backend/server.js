require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const http = require("http");

const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");

const stockRoutes = require("./routes/stockRoutes");

const socketHandler = require("./services/socketHandler");

const startEngine = require("./services/startEngine");

const app = express();

const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });
const io = new Server(server, {
  cors: {
    // origin: "http://localhost:5173",
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

// app.use(cors());
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/stocks", stockRoutes);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socketHandler(io, socket);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    startEngine(io);

    server.listen(process.env.PORT, () => {
      console.log(`Server running on ${process.env.PORT}`);
    });
  })
  .catch(console.error);
