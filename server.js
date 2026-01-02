const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: { origin: "*" }
});

mongoose.connect(
  "mongodb+srv://alexbhuti6:Bahawalpur@clustermursleen.wkaoisi.mongodb.net/chatdb?retryWrites=true&w=majority"
  
)

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("sendMessage", async (data) => {
    const msg = await Message.create(data);
    io.emit("receiveMessage", msg);
  });
});

server.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});


