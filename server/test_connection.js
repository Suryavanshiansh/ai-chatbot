import dotenv from "dotenv";
dotenv.config();

const testConnection = async () => {
  console.log("🔍 Testing HF API connection...");
  console.log("Key:", process.env.HF_API_KEY ? "✅ Found" : "❌ Missing");

  const MODEL = "mistralai/Mistral-7B-Instruct-v0.2";

  try {
    const res = await fetch(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          inputs: "<s>[INST] Say hello in one sentence. [/INST]",
          parameters: {
            max_new_tokens: 50,
            return_full_text: false,
          },
        }),
      }
    );

    console.log("Status:", res.status, res.statusText);

    const text = await res.text();

    if (!res.ok) {
      console.error("❌ Error response:", text);
      return;
    }

    const data = JSON.parse(text);
    const reply = Array.isArray(data) ? data[0]?.generated_text : data.generated_text;
    console.log("✅ AI Reply:", reply);

  } catch (err) {
    console.error("❌ Fetch Error:", err.message);
  }
};

testConnection();
