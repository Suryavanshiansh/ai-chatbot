import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("CRITICAL: GEMINI_API_KEY is missing from environment variables.");
      return res.status(500).json({ error: "Gemini API key is not configured on Vercel." });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Using gemini-1.5-flash-latest for maximum compatibility
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    console.log("Processing message for Gemini...");
    const result = await model.generateContent(message);
    const responseText = result.response.text();

    return res.status(200).json({ reply: responseText });

  } catch (error) {
    console.error("Gemini API Error:", error.message || error);
    
    // Check for common quota/region errors
    if (error.message?.includes("429") || error.message?.includes("quota")) {
      return res.status(429).json({ reply: "⚠️ Gemini quota reached. Please try again in 60 seconds." });
    }
    
    return res.status(500).json({ error: "The AI service encountered an error. Check Vercel logs for details." });
  }
}
