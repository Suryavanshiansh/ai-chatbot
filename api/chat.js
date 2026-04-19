import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    // Diagnostic log (will show in Vercel dashboard logs)
    if (apiKey) {
      console.log(`API Key found (starts with: ${apiKey.substring(0, 4)}...)`);
    } else {
      console.error("GEMINI_API_KEY is MISSING in Vercel Environment Variables");
    }

    if (!apiKey) {
      return res.status(500).json({ error: "Gemini API key is not configured on Vercel." });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);
    const responseText = result.response.text();

    return res.status(200).json({ reply: responseText });

  } catch (error) {
    console.error("Gemini API Error:", error.message || error);
    return res.status(500).json({ error: "Check Vercel logs for API error details." });
  }
}
