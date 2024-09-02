import { io } from "socket.io-client";

const socket = io("http://localhost:8000"); // Use your backend URL

export default socket;