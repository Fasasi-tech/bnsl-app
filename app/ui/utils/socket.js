import { io } from "socket.io-client";

const socket = io("https://vendor-application.onrender.com"); // Use your backend URL

export default socket;