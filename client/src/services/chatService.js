import axios from "axios";

export const sendMessage = async (message) => {
  // Use relative path for production (Vercel)
  // For local development, this still works if you use a proxy or run from the same host
  const res = await axios.post("/api/chat", {
    message,
  });
  return res.data.reply;
};