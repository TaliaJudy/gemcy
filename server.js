import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const GEMINI_API_KEY = "YOUR_API_KEY_HERE"; // 🔑 put your Gemini API key here

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "⚠️ Error reaching Gemini" });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
