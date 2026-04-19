import dotenv from "dotenv";
dotenv.config();

const testHF = async () => {
    try {
        console.log("Testing HF token...");
        const response = await fetch("https://huggingface.co/api/whoami-v2", {
            headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` }
        });
        const data = await response.json();
        console.log("Whoami response:", data);
        
        // Test a simple model
        const model = "gpt2";
        const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
            method: "POST",
            headers: { 
                Authorization: `Bearer ${process.env.HF_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: "Hello" })
        });
        console.log(`Status for ${model}:`, res.status);
        const text = await res.text();
        console.log("Response data:", text.substring(0, 500));
    } catch (err) {
        console.error("Error:", err.message);
    }
}
testHF();
