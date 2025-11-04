# 🍽️ Food Analyzer Pro - AI-Powered Calorie Detection

An intelligent web application that uses computer vision and AI to automatically detect food items, estimate portions, and calculate comprehensive nutritional information from food images.

![Project Banner](https://img.shields.io/badge/AI-Powered-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![Status](https://img.shields.io/badge/Status-Active-success)

## 🎯 Overview

Food Analyzer Pro eliminates the tedious process of manual calorie tracking by leveraging AI vision-language models to analyze food photos and provide instant nutritional breakdowns. Simply snap a photo of your meal and get detailed information about calories, macronutrients, and portion sizes.

### ⚡ Key Benefits
- **95% Time Reduction**: From 10 minutes of manual logging to 30 seconds
- **Accurate Analysis**: AI-powered food recognition with realistic estimates
- **Comprehensive Data**: Full macronutrient breakdown (protein, carbs, fats, fiber)
- **History Tracking**: Keep track of all your analyses
- **Export Ready**: Download results in JSON or CSV format

## ✨ Features

### 🤖 AI Analysis
- **Vision-Language Model Integration**: Powered by Qwen 2.5-VL (7B parameters)
- **Multi-Food Detection**: Identifies and analyzes multiple food items in one image
- **Macronutrient Calculation**: Detailed breakdown of protein, carbs, fats, and fiber
- **Portion Estimation**: Realistic gram estimates for each food item
- **Count Detection**: Recognizes multiple pieces (e.g., "3 eggs")

### 🎨 User Interface
- **Modern Design**: Clean, professional UI with gradient accents
- **Dark/Light Theme**: Toggle between themes with persistence
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Drag & Drop Upload**: Intuitive file upload experience
- **Live Camera Capture**: Take photos directly from the app (mobile-ready)
- **Image Preview**: See your image before analysis
- **Loading States**: Clear feedback during AI processing

### 📊 Data Visualization
- **Interactive Charts**: Beautiful doughnut chart showing macronutrient distribution
- **Stats Cards**: Quick overview of total calories and macros
- **Food Item Cards**: Detailed breakdown for each detected item
- **Color-Coded Display**: Easy-to-read nutritional information

### 💾 Data Management
- **Analysis History**: Automatically saves last 20 analyses
- **Click to Review**: Load any previous analysis instantly
- **Local Storage**: No server storage needed - privacy-first approach
- **Delete Individual Items**: Remove specific history entries
- **Clear All History**: One-click bulk deletion with confirmation
- **Export Formats**: 
  - JSON: Complete analysis data
  - CSV: Spreadsheet-ready format for Excel/Google Sheets

### 🔒 Security & Performance
- **Secure File Handling**: Automatic cleanup of temporary uploaded files
- **Timeout Management**: 5-minute timeout for long-running AI requests
- **Error Handling**: Comprehensive error messages and recovery
- **Input Validation**: File type and size verification
- **CORS Support**: Secure cross-origin requests

## 🛠️ Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web server framework
- **Multer**: File upload handling
- **node-fetch**: HTTP client for AI API calls
- **CORS**: Cross-origin resource sharing

### Frontend
- **Vanilla JavaScript**: No framework dependencies
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with variables and grid
- **Chart.js**: Interactive data visualization

### AI/ML
- **Qwen 2.5 Vision-Language Model (7B)**: Computer vision + NLP
- **LM Studio**: Local model server (port 1234)
- **JSON Structured Output**: Consistent, parseable responses

## 📋 Requirements

- Node.js (v14 or higher)
- npm or yarn
- LM Studio (or compatible OpenAI-style API server)
- Qwen 2.5-VL-7B model (or similar vision-language model)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Calorie Detector"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup AI Model
1. Download and install [LM Studio](https://lmstudio.ai/)
2. Download the Qwen 2.5-VL-7B model (or similar vision-language model)
3. Start the local server on port 1234
4. Ensure the model identifier matches in `server.js` (line 11)

### 4. Start the Server
```bash
npm start
# or
node server.js
```

The server will start on `http://localhost:3000`

### 5. Open the Application
1. Open your browser
2. Navigate to `frontend/index.html` directly, or
3. Set up a simple file server:
```bash
npx serve frontend
```

## 📖 Usage Guide

### Analyzing Food
1. **Upload an Image**:
   - Click the upload area to select a file
   - Drag and drop an image
   - Use "Take Photo" button on mobile devices

2. **Preview**: Review your image before analysis

3. **Analyze**: Click "🔍 Analyze Food" button

4. **Wait**: The AI processes your image (10-30 seconds)

5. **Review Results**:
   - Total calories and macros at the top
   - Interactive chart showing nutrient distribution
   - Detailed list of each food item detected

### Viewing History
- Scroll down to "📜 Analysis History"
- Click any history item to reload those results
- Use "Delete" button to remove individual entries
- Use "🗑️ Clear History" in header to remove all

### Exporting Data
1. After analysis, scroll to results section
2. Click "📄 Export JSON" for complete data
3. Click "📊 Export CSV" for spreadsheet format
4. Files download automatically with timestamp

### Changing Theme
- Click "🌙 Toggle Theme" in the header
- Theme preference is saved automatically
- Charts adapt to current theme

## 🔧 Configuration

### Server Configuration (`server.js`)

```javascript
const LM_API = "http://127.0.0.1:1234/v1"; // Change if using different host/port
const MODEL = "qwen2.5-vl-7b"; // Update to match your model name
```

### Timeout Settings
```javascript
res.setTimeout(300000); // 5 minutes - adjust as needed
```

### Frontend Configuration (`index.html`)

```javascript
const API_URL = 'http://127.0.0.1:3000/analyze'; // Update if server URL changes
```

### History Limit
```javascript
if (analysisHistory.length > 20) analysisHistory.pop(); // Change max history items
```

## 📊 API Response Format

The AI returns structured JSON:

```json
{
  "food_items": [
    {
      "name": "Grilled Chicken Breast",
      "count": 1,
      "grams": 200,
      "calories": 330,
      "protein": 62,
      "carbs": 0,
      "fats": 7,
      "fiber": 0
    },
    {
      "name": "Brown Rice",
      "count": 1,
      "grams": 150,
      "calories": 216,
      "protein": 5,
      "carbs": 45,
      "fats": 2,
      "fiber": 3
    }
  ]
}
```

## 🐛 Troubleshooting

### "Error from language model API"
- Ensure LM Studio is running
- Check model is loaded and server is on port 1234
- Verify model name matches configuration

### "Request timed out"
- Image may be too complex
- Model might be slow - adjust timeout in `server.js`
- Check system resources (RAM, GPU)

### "No food items detected"
- Try a clearer, well-lit photo
- Ensure food items are visible and in focus
- Model may not recognize the specific cuisine

### Export buttons not working
- Ensure you have an active analysis
- Check browser allows downloads
- Try a different browser if issues persist

### History not saving
- Check browser allows localStorage
- Try clearing browser cache
- Disable private/incognito mode

## 🎯 Use Cases

- **Fitness Tracking**: Quick nutrition logging for athletes and fitness enthusiasts
- **Dietary Management**: Monitor calorie intake for weight management
- **Health Conditions**: Track macros for diabetes, heart health, etc.
- **Meal Planning**: Calculate nutritional values for meal prep
- **Restaurant Analysis**: Estimate calories when dining out
- **Food Journaling**: Visual diary of daily meals
- **Nutrition Education**: Learn about food composition
- **Recipe Development**: Analyze homemade meal nutrition

## 🚀 Future Enhancements

### In Development
- 📱 **Mobile Apps**: Native iOS and Android applications
- ☁️ **Cloud Sync**: Cross-device history synchronization
- 🤖 **Meal Recommendations**: AI-powered meal planning
- 📈 **Analytics Dashboard**: Weekly/monthly nutrition trends
- 🎯 **Goal Tracking**: Set and monitor dietary goals
- 🔗 **Integration**: Connect with fitness apps (MyFitnessPal, etc.)

### Planned Features
- 🍽️ **Meal Database**: Save favorite meals for quick entry
- 👥 **Multi-user Support**: Accounts and authentication
- 📸 **Batch Processing**: Analyze multiple images at once
- 🌍 **Cuisine Database**: Enhanced recognition for global foods
- 📊 **Advanced Charts**: More visualization options
- 🔔 **Reminders**: Meal logging notifications
- 🏆 **Gamification**: Streaks and achievements
- 🗣️ **Voice Input**: Describe meals verbally

## 🤝 Contributing

Contributions are welcome! Areas for improvement:

1. **AI Accuracy**: Help train on diverse food datasets
2. **UI/UX**: Design improvements and accessibility
3. **Performance**: Optimization for faster analysis
4. **Features**: Implement roadmap items or suggest new ones
5. **Documentation**: Improve guides and add translations
6. **Testing**: Add unit tests and integration tests

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Author

Built with ❤️ as a practical application of AI vision-language models.

## 🙏 Acknowledgments

- **Qwen Team**: For the excellent vision-language model
- **LM Studio**: For making local LLM deployment easy
- **Chart.js**: For beautiful, responsive charts
- **Express.js**: For the robust web framework

## 📞 Support

For questions, issues, or feature requests, please open an issue on the repository.

---

**Made possible by the intersection of computer vision, natural language processing, and practical web development.**
