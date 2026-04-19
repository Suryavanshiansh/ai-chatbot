import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

export const getAIResponse = async (message) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY missing from .env");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    console.log("Sending to Gemini...");
    const result = await model.generateContent(message);
    const responseText = result.response.text();

    return responseText;

  } catch (error) {
    console.error("AI SERVICE ERROR:", error.message || error);
    
    if (error.message?.includes("429") || error.message?.includes("quota")) {
      return "⚠️ Gemini quota reached. Please try again in 60 seconds.";
    }

    return "⚠️ Sorry, I ran into an error connecting to Gemini.";
  }
};