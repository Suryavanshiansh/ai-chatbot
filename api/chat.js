import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!process.env.NVIDIA_API_KEY) {
      console.error("DEBUG: NVIDIA_API_KEY is missing from environment variables.");
      return res.status(500).json({ error: "Server Configuration Error: API Key missing." });
    }

    const client = new OpenAI({
      apiKey: process.env.NVIDIA_API_KEY,
      baseURL: "https://integrate.api.nvidia.com/v1",
    });

    const response = await client.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct", // more recent model
      messages: [{ role: "user", content: message }],
    });

    return res.status(200).json({
      reply: response.choices[0].message.content,
    });

  } catch (error) {
    console.error("API ERROR DETAILS:", error.message || error);
    // Return more specific error message if available
    const status = error.status || 500;
    const message = error.error?.message || "AI service failed";
    return res.status(status).json({ error: message });
  }
}