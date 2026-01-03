import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"; // adjust if needed

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

const response = await axios.post(
 GROQ_API_URL,
  {
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: "You are a friendly AI companion." },
      { role: "user", content: userMessage }
    ],
  },
  {
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json"
    }
  }
);

    const aiReply = response.data.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
  error: error.response?.data || error.message
}); 
  }
});

app.listen(5000, () => console.log("AI Agent running on port 5000"));