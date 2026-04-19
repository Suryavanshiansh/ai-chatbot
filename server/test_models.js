import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const testModels = async () => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // We can't really "list" without a method, but we can test common model names
        const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
        
        for (const modelName of models) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("hi");
                console.log(`Success with ${modelName}:`, result.response.text());
                return;
            } catch (err) {
                console.log(`Failed with ${modelName}:`, err.message);
            }
        }
    } catch (err) {
        console.error("General Error:", err.message);
    }
}
testModels();
