# 🚀 Quick Start Guide

Get your AI Game Generator up and running in 4 simple steps!

## Step 0: Setup Environment Variables

**IMPORTANT:** Before starting the backend, you need to create a `.env` file in the `backend/` directory.

1. Create a file named `.env` in the `backend/` folder
2. Add the following content:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3001
   ```
3. Replace `your_openai_api_key_here` with your actual OpenAI API key
   - Get your API key from: https://platform.openai.com/api-keys

## Step 1: Start the Backend

Open a terminal and run:

```bash
cd backend
npm install  # Only needed the first time
npm start
```

You should see:
```
🎮 AI Game Generator Backend running on port 3001
📡 API available at http://localhost:3001
🤖 Using OpenAI GPT-4 for game generation
```

**If you see an error about OPENAI_API_KEY, go back to Step 0!**

**Keep this terminal running!**

## Step 2: Start the Frontend

Open a **new terminal** and run:

```bash
cd frontend
npm install  # Only needed the first time
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Step 3: Open the App

Open your browser and go to:
```
http://localhost:5173
```

## 🎮 Try Your First Game!

1. In the text box, type: **"A snake game with rainbow colors"**
2. Keep difficulty as "Medium"
3. Click **"Generate Game"**
4. Wait 10-30 seconds
5. Play your generated game!

## 🔧 Troubleshooting

### Backend won't start
- **Most common issue:** Make sure you have the `.env` file in the `backend/` directory with your OpenAI API key
- Check that your OpenAI API key is valid and has credits
- Ensure port 3001 is not in use by another application
- If you see "OPENAI_API_KEY is not set", you need to create the `.env` file (see Step 0)

### Frontend shows "Backend not connected" warning
- Make sure the backend server is running (Step 1)
- Check that backend is running on port 3001
- Look at the backend terminal for any error messages
- Try refreshing the frontend page

### Frontend won't start
- Make sure you ran `npm install` in the frontend directory
- Check that port 5173 is not in use

### Games won't generate / Infinite loading
- **Check the browser console** (F12) for detailed error messages
- Verify your OpenAI API key has credits and is valid
- Make sure backend is running on port 3001
- The frontend now has a 2-minute timeout - if it takes longer, check backend logs
- Look for connection errors in the browser console

### CORS errors
- Ensure backend is running before starting frontend
- Check that backend has CORS enabled (it should by default)

## 📝 Example Prompts to Try

- "A breakout game with colorful bricks"
- "Flappy bird but with a spaceship"
- "Tic-tac-toe with animations"
- "Memory matching card game"
- "A simple pong game"
- "Whack-a-mole but with aliens"

## 🎨 Tips for Better Games

1. **Be specific** - "A snake game with neon colors" is better than just "snake game"
2. **Mention style** - Add words like "colorful", "retro", "minimalist"
3. **Start simple** - Get a basic version working, then use "Improve" to enhance it
4. **Use the Improve feature** - Once a game is generated, you can request improvements like:
   - "Make it faster"
   - "Add sound effects"
   - "Add power-ups"
   - "Change colors to blue and yellow"

## 💾 Download Your Games

Click the "Download" button to save any game as a standalone HTML file. You can:
- Share it with friends
- Open it in any browser
- Upload it to a website
- Modify the code manually

## 🛑 Stopping the Servers

When you're done:
1. Go to each terminal
2. Press `Ctrl+C` to stop the server

Enjoy creating games with AI! 🎮✨
