import app from "./app.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Manually load .env from the same folder as this file
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

// Check if keys loaded (for local debugging)
console.log(`Debug: GEMINI_API_KEY is ${process.env.GEMINI_API_KEY ? "PRESENT" : "MISSING"} in process.env`);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});