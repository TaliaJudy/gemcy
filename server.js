// server.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Your Gemini API Key (hardcoded)
const GEMINI_API_KEY = "AIzaSyBkCgeZUKCg9IF9dDZe6xIiGw_-QG3wEAA";

// Default route
app.get("/", (req, res) => {
  res.send("💞👄✅ Cytra Hub + Gemini AI Server is Running...");
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: userMessage }] }],
        }),
      }
    );

    const data = await response.json();

    // Extract response text safely
    let botReply = "⚠️ No response";
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      botReply = data.candidates[0].content.parts[0].text;
    }

    res.json({ reply: botReply });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
