import dotenv from "dotenv";
dotenv.config();

export const getAIResponse = async (message) => {
  try {
    if (!process.env.HF_API_KEY) {
      throw new Error("HF_API_KEY missing from .env");
    }

    const MODEL = "mistralai/Mistral-7B-Instruct-v0.2";

    console.log(`Sending to HuggingFace [${MODEL}]...`);

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
          inputs: `<s>[INST] ${message} [/INST]`,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.7,
            return_full_text: false,
          },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error(`HF Error [${res.status}]:`, errText);

      if (res.status === 503) {
        return "⌛ Model is loading, please try again in 10 seconds.";
      }
      if (res.status === 401) {
        return "🔑 Invalid API key. Please check your HF_API_KEY in .env";
      }

      throw new Error(`HF API error: ${res.status}`);
    }

    const data = await res.json();
    console.log("HF RESPONSE:", data);

    // Handle both array and object responses
    let reply = "";
    if (Array.isArray(data)) {
      reply = data[0]?.generated_text || "No reply";
    } else {
      reply = data.generated_text || "No reply";
    }

    return reply.trim();

  } catch (error) {
    console.error("AI SERVICE ERROR:", error.message);
    return "⚠️ Sorry, I ran into an error connecting to the AI.";
  }
};