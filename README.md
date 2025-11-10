# 🎮 AI Game Generator

An AI-powered game generator that creates playable HTML5 games from text prompts using OpenAI's GPT-4. Describe any game idea, and watch AI bring it to life instantly!

## Features

- **AI-Powered Generation**: Uses GPT-4 to generate complete, playable games from natural language prompts
- **Live Sandbox**: Games run immediately in an isolated iframe sandbox
- **Game Improvement**: Iteratively improve generated games with additional prompts
- **Difficulty Levels**: Choose between easy, medium, and hard difficulty settings
- **Game History**: Keep track of all generated games in your session
- **Download Games**: Download any generated game as a standalone HTML file
- **Modern UI**: Beautiful, responsive interface with gradient design

## Tech Stack

### Backend
- Node.js with Express
- OpenAI GPT-4 API
- CORS enabled for local development

### Frontend
- React 18
- Vite (fast build tool)
- Modern CSS with gradients and animations

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- OpenAI API key

### Installation

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**

   The `.env` file in the backend directory should contain:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3001
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:3001`

2. **Start the Frontend (in a new terminal)**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## How to Use

1. **Enter a game prompt** - Describe the game you want to create
   - Examples:
     - "A snake game with neon colors"
     - "Flappy bird but in space"
     - "A pong game with power-ups"
     - "Memory card matching game"

2. **Select difficulty** - Choose easy, medium, or hard

3. **Click Generate** - Wait for the AI to create your game (usually 10-30 seconds)

4. **Play the game** - Your game appears in the sandbox and is ready to play!

5. **Improve it** (optional) - Request improvements like:
   - "Make it faster"
   - "Add power-ups"
   - "Change colors to blue"
   - "Add sound effects"

6. **Download** - Save your game as a standalone HTML file

## API Endpoints

### Backend API

- `POST /api/game/generate` - Generate a new game
  ```json
  {
    "prompt": "A snake game with rainbow colors",
    "difficulty": "medium"
  }
  ```

- `POST /api/game/improve` - Improve an existing game
  ```json
  {
    "gameId": "game_123...",
    "improvementPrompt": "Make it faster"
  }
  ```

- `GET /api/game/:gameId` - Get a specific game
- `GET /api/games` - List all generated games
- `GET /api/health` - Health check endpoint

## Project Structure

```
vesthackathonthing/
├── backend/
│   ├── server.js          # Express server + OpenAI integration
│   ├── package.json
│   └── .env               # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── App.css        # Styling
│   │   ├── index.css      # Global styles
│   │   └── main.jsx       # React entry point
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## How It Works

1. **User submits a prompt** describing their game idea
2. **Backend receives the request** and constructs a detailed prompt for GPT-4
3. **GPT-4 generates** complete HTML/CSS/JavaScript game code
4. **Backend extracts** the code from the response and returns it
5. **Frontend renders** the game in a sandboxed iframe
6. **User plays** the game immediately!

The AI is instructed to:
- Create self-contained HTML files with inline CSS and JavaScript
- Use HTML5 Canvas for graphics when appropriate
- Include game controls, scoring, and restart functionality
- Make games visually appealing with modern styling
- Ensure games are fully playable without external dependencies

## Example Prompts

- "A breakout game with colorful bricks and power-ups"
- "Tic-tac-toe with animations"
- "A simple platformer game where you jump over obstacles"
- "Simon says memory game with sounds"
- "Whack-a-mole but with aliens"
- "A racing game viewed from above"

## Security

- Games run in sandboxed iframes with `allow-scripts` and `allow-same-origin` permissions
- No external network requests from generated games
- All game code is isolated from the main application

## Limitations

- Generated games are limited by the 4000 token max completion limit
- Complex games may require multiple iterations to perfect
- Game quality depends on prompt clarity and detail
- Some games may require improvements to be fully functional

## Future Enhancements

- [ ] Game templates library
- [ ] Multiplayer support
- [ ] Game sharing via URLs
- [ ] Code editor for manual tweaks
- [ ] Game ratings and favorites
- [ ] Database persistence
- [ ] User accounts
- [ ] Public game gallery

## License

MIT

## Credits

Built with ❤️ using OpenAI GPT-4, React, and Express
