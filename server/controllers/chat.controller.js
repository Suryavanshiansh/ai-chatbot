import { getAIResponse } from "../services/ai.service.js";

export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    console.log("USER MESSAGE:", message); // debug

    const reply = await getAIResponse(message);

    console.log("AI REPLY:", reply); // debug

    res.json({ reply });

  } catch (error) {
    console.error("CONTROLLER ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};