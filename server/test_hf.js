import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const test = async () => {
    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
            {
                inputs: "hello there"
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        console.log("Success:", response.data);
    } catch (err) {
        console.error("Error:", err.response?.data || err.message);
    }
}
test();
