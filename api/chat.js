import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const client = new OpenAI({
      apiKey: process.env.NVIDIA_API_KEY,
      baseURL: "https://integrate.api.nvidia.com/v1",
    });

    const response = await client.chat.completions.create({
      model: "meta/llama3-8b-instruct", // lighter & faster
      messages: [{ role: "user", content: message }],
    });

    return res.status(200).json({
      reply: response.choices[0].message.content,
    });

  } catch (error) {
    console.error("API ERROR:", error);
    return res.status(500).json({ error: "AI error" });
  }
}