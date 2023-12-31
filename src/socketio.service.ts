import { io } from "socket.io-client";

class SocketioService {
  socket;

  constructor() {}

  setupSocketConnection() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    // this.socket.emit("my message", "hello vue");
    this.socket.on("get-users", (data) => {
      console.log(data, "data");
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();
