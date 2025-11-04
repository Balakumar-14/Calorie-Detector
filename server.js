import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import fs from "fs";
import cors from "cors";

const app = express();
const upload = multer({ dest: "uploads/" });

const LM_API = "http://127.0.0.1:1234/v1";
const MODEL = "qwen/qwen2.5-vl-7b"; // your model identifier

// Increase server timeout for long-running LLM calls (e.g., to 5 minutes)
// This should be set BEFORE your routes
app.use((req, res, next) => {
  res.setTimeout(300000, () => { // 300000 ms = 5 minutes
    console.log('Request has timed out.');
    res.status(503).send('Request timed out after 5 minutes. Please try again.');
  });
  next();
});


// Enable CORS for all routes (you might want to configure this more strictly in production)
app.use(cors());

// Serve the frontend
app.get("/", (req, res) => {
  res.sendFile("frontend/index.html", { root: "." });
});

app.post("/analyze", upload.single("image"), async (req, res) => {
  let imagePath;
  try {
    if (!req.file) {
      return res.status(400).send("No image file uploaded.");
    }

    imagePath = req.file.path;

    const imageData = fs.readFileSync(imagePath).toString("base64");
    const mimeType = req.file.mimetype;

    const formData = {
      model: MODEL,
      messages: [
        {
          role: "user",
          content: [
        {
          type: "text",
          text: `You are a nutrition AI. Identify all the food items visible in the given image. 
Return the result ONLY as a valid JSON object in the format below. 
Do not include explanations, text, or markdown formatting.

Format:
{
  "food_items": [
    {
      "name": "<food_name>",
      "count":"<integer>,
      "grams": <integer>,
      "calories": <integer>
    }
  ]
}

Rules:
- Always use the key "food_items".
- Provide realistic grams and calories for each item.
- Identify each dish separately (example: rice, chapati, dal, beetroot fry, carrot fry, boiled eggs).
- If multiple pieces exist (like 8 boiled eggs), count them together and give a total grams + calories estimate.
- If you feel unsure about an item, include it.
- Respond only in valid JSON (no extra text).`
        },
        {
          type: "image_url",
          image_url: {
            url: `data:${mimeType};base64,${imageData}`
          }
        }
      ]
        }
      ]
    };

    const response = await fetch(`${LM_API}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    console.log("LM API response status:", response.status);

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`LM API error: ${response.status} - ${errorText}`);
        return res.status(response.status).send(`Error from language model API: ${errorText}`);
    }

    const data = await response.json();

    let output = data.choices?.[0]?.message?.content || "";
    output = output.replace(/```json|```/g, "").trim();
    console.log("Model output:", output);

    let parsed;
    try {
      parsed = JSON.parse(output);
    } catch (e) {
      console.error("Failed to parse JSON from model output:", output, e);
      return res.status(500).json({ error: "Model did not return valid JSON", raw_output: output });
    }

    res.json(parsed);
    console.log("Response sent successfully.");

  } catch (err) {
    console.error("Error processing image request:", err);
    // Important: check if headers have already been sent to avoid "Headers already sent" error
    if (!res.headersSent) {
      res.status(500).send("Error processing image");
    }
  } finally {
    if (imagePath && fs.existsSync(imagePath)) {
      try {
        fs.unlinkSync(imagePath);
      } catch (unlinkErr) {
        console.error("Error deleting temporary file:", unlinkErr);
      }
    }
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});