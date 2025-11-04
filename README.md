# 🍽️ Calorie Detector

A web application that uses AI vision models to analyze food images and estimate nutritional information including calorie counts.

## Features

- 📸 Upload food images via drag & drop or file selection
- 🤖 AI-powered food identification using vision language models
- 🔢 Automatic calorie and portion estimation
- 📊 Detailed nutritional breakdown by food item
- 🎨 Modern, responsive UI with real-time feedback

## Prerequisites

Before running this application, you need:

1. **Node.js** (v14 or higher)
2. **LM Studio** or compatible local LLM server running on port `1234`
3. **Vision-capable model** loaded (e.g., `qwen/qwen2.5-vl-7b`)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Calorie-Detector
```

2. Install dependencies:
```bash
npm install
```

3. Start your local LLM server (e.g., LM Studio) with a vision model loaded

4. Run the application:
```bash
npm start
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

## Configuration

The application is configured to use:
- **LLM API**: `http://127.0.0.1:1234/v1`
- **Model**: `qwen/qwen2.5-vl-7b`
- **Port**: `3000`

You can modify these settings in `server.js` if needed.

## How It Works

1. User uploads a food image through the web interface
2. Image is sent to the backend server
3. Server encodes the image and sends it to the local LLM API
4. AI model analyzes the image and identifies food items
5. Model estimates grams and calories for each item
6. Results are displayed with total calorie count

## API Endpoints

### `GET /`
Serves the frontend web application

### `POST /analyze`
Analyzes food image and returns nutritional information

**Request:**
- Content-Type: `multipart/form-data`
- Body: Image file

**Response:**
```json
{
  "food_items": [
    {
      "name": "rice",
      "count": 1,
      "grams": 100,
      "calories": 200
    }
  ]
}
```

## Technology Stack

- **Backend**: Node.js, Express
- **File Upload**: Multer
- **AI Integration**: Local LLM API (OpenAI-compatible)
- **Frontend**: Vanilla JavaScript, HTML5, CSS3

## Screenshots

The application features a modern, gradient-styled interface with:
- Intuitive drag-and-drop file upload
- Real-time analysis feedback
- Formatted JSON results with total calorie calculation

## Troubleshooting

### "No models loaded" error
Make sure your LLM server (e.g., LM Studio) is running with a vision-capable model loaded.

### "Request timed out" error
The server has a 5-minute timeout. Very large images or slow models may time out. Try with smaller images.

### Model name mismatch
Check that the model name in `server.js` matches exactly with the model ID in your LLM server.

## License

MIT License - feel free to use and modify as needed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

